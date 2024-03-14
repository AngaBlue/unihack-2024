using UnityEngine;
using SocketIOClient;
using System;
using System.Collections;
using System.Collections.Generic;

public class ObjectPlacer : MonoBehaviour
{
    public GameObject exclamationPrefab;
    public GameObject interactablePrefab;
    public Transform centerEyeAnchor;
    public Transform rightHandAnchor;
    private int place = 0;
    private int placedelay = 1000;
    private SocketIO client;

    // Public variables to set the maximum rotation in degrees
    public float maxHorizontalRotationDegrees = 30f;
    public float maxVerticalRotationDegrees = 30f;

    async void Start()
    {
        client = new SocketIO("https://instructarapi.anga.dev/", new SocketIOOptions
        {
            Transport = SocketIOClient.Transport.TransportProtocol.WebSocket
        });

        client.OnConnected += async (sender, e) =>
        {
            Debug.Log("Connected");


        };

        client.On("displayIndicator", response =>
        {
            Debug.Log("Received data: " + response.ToString());
            // float horizontalRotation = MapRangeToDegrees(horizontalInput, maxHorizontalRotationDegrees);
            // float verticalRotation = MapRangeToDegrees(verticalInput, maxVerticalRotationDegrees);

            // Vector3 rayDirection = CalculateRayDirection(horizontalRotation, verticalRotation);
            // Ray ray = new Ray(transform.position, rayDirection);

            // if (Physics.Raycast(ray, out RaycastHit hit))
            // {
            //     Instantiate(exclamationPrefab, hit.point + Vector3.up * 0.5f, Quaternion.identity);
            // }
        });

        await client.ConnectAsync();
        await client.EmitAsync("getStreamCode");
        StartCoroutine(ConnectAndEmit());
    }

    void Update()
    {
        // if (place == placedelay)
        // {
        //     int horizontalInput = 50; // get from socket
        //     int verticalInput = 50; // get from socket

        //     float horizontalRotation = MapRangeToDegrees(horizontalInput, maxHorizontalRotationDegrees);
        //     float verticalRotation = MapRangeToDegrees(verticalInput, maxVerticalRotationDegrees);

        //     Vector3 rayDirection = CalculateRayDirection(horizontalRotation, verticalRotation);
        //     Ray ray = new Ray(transform.position, rayDirection);

        //     if (Physics.Raycast(ray, out RaycastHit hit))
        //     {
        //         GameObject uiInstance = Instantiate(exclamationPrefab, hit.point + Vector3.up * 0.2f, Quaternion.identity);
        //     }
        // }
        // place += 1;

        if (OVRInput.GetDown(OVRInput.Button.One, OVRInput.Controller.RTouch))
        {
            GameObject interactableInstance = Instantiate(interactablePrefab, rightHandAnchor.position, Quaternion.identity);
        }
        if (OVRInput.GetDown(OVRInput.Button.Two, OVRInput.Controller.RTouch))
        {
            GameObject exclamInstance = Instantiate(exclamationPrefab, rightHandAnchor.position, Quaternion.identity);
        }
    }
    IEnumerator ConnectAndEmit()
    {
        // Connect to the Socket.IO server
        yield return client.ConnectAsync();

        // Optionally, emit 'getStreamCode' if needed
        // yield return socket.EmitAsync("getStreamCode");

        // Start sending location updates
        StartCoroutine(SendLocationUpdates());
    }
    IEnumerator SendLocationUpdates()
    {
        while (true)
        {
            Vector3 position = transform.position; // Get the object's position
            Vector3 direction = transform.forward; // Get the object's forward direction

            // Convert to a simple array or a format that matches your server's expectations
            float[] location = { position.x, position.y, position.z };
            float[] dir = { direction.x, direction.y, direction.z };

            // Emit the location event with the position and direction data
            yield return client.EmitAsync("location", new { location, direction = dir });

            // yield return new WaitForSeconds(1); // Wait for a second or adjust as needed
        }
    }

    async void OnDestroy()
    {
        if (client != null)
        {
            await client.DisconnectAsync();
        }
    }

    private float MapRangeToDegrees(int input, float maxRotationDegrees)
    {
        return (input - 50) * (maxRotationDegrees / 50);
    }

    private Vector3 CalculateRayDirection(float horizontalRotation, float verticalRotation)
    {
        Quaternion rotation = Quaternion.Euler(-verticalRotation, horizontalRotation, 0);
        return transform.rotation * rotation * Vector3.forward;
    }
}


