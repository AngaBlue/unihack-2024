using UnityEngine;
using System;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class ObjectPlacer : MonoBehaviour
{
    public GameObject objectToPlacePrefab;
    private TcpClient client;
    private Thread clientThread;
    private string receivedMessage = "";

    // Public variables to set the maximum rotation in degrees
    public float maxHorizontalRotationDegrees = 30f;
    public float maxVerticalRotationDegrees = 30f;

    void Start()
    {
        // ConnectToServer();
    }

    private int[,] cornerInputs = new int[5, 2]
    {
        { 0, 0 },     // Top-left corner
        { 100, 0 },   // Top-right corner
        { 0, 100 },   // Bottom-left corner
        { 100, 100 }, // Bottom-right corner
        { 50, 50 }    // Center
    };
    void Update()
    {
        for (int i = 0; i < cornerInputs.GetLength(0); i++)
        {
            int horizontalInput = cornerInputs[i, 0];
            int verticalInput = cornerInputs[i, 1];

            float horizontalRotation = MapRangeToDegrees(horizontalInput, maxHorizontalRotationDegrees);
            float verticalRotation = MapRangeToDegrees(verticalInput, maxVerticalRotationDegrees);

            Vector3 rayDirection = CalculateRayDirection(horizontalRotation, verticalRotation);
            Ray ray = new Ray(transform.position, rayDirection);

            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                Instantiate(objectToPlacePrefab, hit.point, Quaternion.identity);
            }
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

    void ConnectToServer()
    {
        try
        {
            //client = new TcpClient("YourServerIP", YourServerPort); // Replace with your server details
            clientThread = new Thread(new ThreadStart(ListenForData));
            clientThread.IsBackground = true;
            clientThread.Start();
        }
        catch (Exception e)
        {
            Debug.LogError("Socket error: " + e.Message);
        }
    }

    private void ListenForData()
    {
        Byte[] bytes = new Byte[1024];
        while (true)
        {
            using (NetworkStream stream = client.GetStream())
            {
                int length;
                while ((length = stream.Read(bytes, 0, bytes.Length)) != 0)
                {
                    var incomingData = new byte[length];
                    Array.Copy(bytes, 0, incomingData, 0, length);
                    receivedMessage = Encoding.ASCII.GetString(incomingData);
                }
            }
        }
    }

    void PlaceObject(Vector3 position)
    {
        Instantiate(objectToPlacePrefab, position, Quaternion.identity);
    }

    void OnDisable()
    {
        if (client != null)
        {
            client.Close();
        }
        if (clientThread != null)
        {
            clientThread.Abort();
        }
    }
}
