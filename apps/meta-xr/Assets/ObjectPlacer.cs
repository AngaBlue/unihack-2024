using UnityEngine;
using SocketIOClient;
using System;
using System.Collections;
using System.Collections.Generic;

public class ObjectPlacer : MonoBehaviour
{
    public GameObject exclamationPrefab;
    public Transform centerEyeAnchor;

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

//  void Update()
//     {
//         if (place == 500)
//         {
//             int horizontalInput = 50; // get from socket
//             int verticalInput = 50; // get from socket

//             float horizontalRotation = MapRangeToDegrees(horizontalInput, maxHorizontalRotationDegrees);
//             float verticalRotation = MapRangeToDegrees(verticalInput, maxVerticalRotationDegrees);

//             Vector3 rayDirection = CalculateRayDirection(horizontalRotation, verticalRotation);
//             Ray ray = new Ray(transform.position, rayDirection);

//             if (Physics.Raycast(ray, out RaycastHit hit))
//             {
//                 GameObject uiInstance = Instantiate(exclamationPrefab, hit.point + Vector3.up * 0.5f, Quaternion.identity);
//             }
//         }
//         place += 1;
//     }
