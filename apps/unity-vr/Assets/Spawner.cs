using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RaycastFromCamera : MonoBehaviour
{
    public float raycastInterval = 2.0f;
    public GameObject prefabToSpawn;
    public string targetTag = "RoomMesh";
    public AudioClip hitSound; // Audio clip to play on hit
    public AudioClip missSound; // Audio clip to play on miss
    public float ballDistance = 1.0f; // Distance between balls

    private Camera ovrCamera;
    private AudioSource audioSource;

    void Start()
    {
        ovrCamera = GetComponentInChildren<Camera>();
        if (ovrCamera == null)
        {
            Debug.LogError("OVRCameraRig does not have a Camera component.");
        }
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
        {
            Debug.LogError("AudioSource component is missing on this GameObject.");
        }
        StartCoroutine(RaycastAtIntervals());
    }

    IEnumerator RaycastAtIntervals()
    {
        while (true)
        {
            yield return new WaitForSeconds(raycastInterval);
            PerformRaycast();
        }
    }

    void PerformRaycast()
    {
        if (ovrCamera == null) return;

        RaycastHit hit;
        Ray ray = new Ray(ovrCamera.transform.position, ovrCamera.transform.forward);

        Vector3 spawnPosition = ovrCamera.transform.position;
        SpawnBall(spawnPosition, Color.white); // Spawn white ball at camera position

        spawnPosition += ray.direction * ballDistance;
        SpawnBall(spawnPosition, Color.gray); // Spawn grey ball a little further

        spawnPosition += ray.direction * ballDistance;
        SpawnBall(spawnPosition, Color.black); // Spawn black ball even further

        if (Physics.Raycast(ray, out hit))
        {
            if (hit.collider.CompareTag(targetTag))
            {
                Instantiate(prefabToSpawn, hit.point, Quaternion.identity);
                audioSource.PlayOneShot(hitSound); // Play hit sound
            }

            // Visualize the Raycast hit
            Debug.DrawLine(ray.origin, hit.point, Color.green, 1.0f);
        }
        else
        {
            audioSource.PlayOneShot(missSound); // Play miss sound

            // Visualize the Raycast miss
            Debug.DrawLine(ray.origin, ray.origin + ray.direction * 100, Color.red, 1.0f);
        }
    }

    void SpawnBall(Vector3 position, Color color)
    {
        GameObject ball = Instantiate(prefabToSpawn, position, Quaternion.identity);
        Renderer ballRenderer = ball.GetComponent<Renderer>();
        if (ballRenderer != null)
        {
            ballRenderer.material.color = color;
        }
    }
}