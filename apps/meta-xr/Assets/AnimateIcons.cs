using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimateIcons : MonoBehaviour
{
     private Transform cameraTransform;

    public float scaleUpTime = 1.0f;    // Time to complete the scale-up effect
    public float bobbingSpeed = 2.0f;   // Speed of the bobbing motion
    public float bobbingAmount = 0.05f; // Amount of bobbing motion

    private float scaleUpTimer = 0.0f;
    private Vector3 initialScale;
    private Vector3 targetScale = Vector3.one; // Scale up to normal size
    private bool isScalingUp = true;

    public GameObject particleEffectPrefab; 

    void Start()
    {
        initialScale = transform.localScale;
        transform.localScale = Vector3.zero; // Start from zero scale
        FindCameraTransform();
    }

    void Update()
    {
        if (cameraTransform != null)
        {
            Vector3 direction = cameraTransform.position - transform.position;
            direction.y = 0; // Keep the UI element upright
            transform.rotation = Quaternion.LookRotation(direction);
        }

    // Handle scaling up effect
        if (isScalingUp)
        {
            scaleUpTimer += Time.deltaTime;
            float scale = Mathf.Clamp01(scaleUpTimer / scaleUpTime);
            transform.localScale = Vector3.Lerp(initialScale, targetScale, scale);

            if (scale >= 1.0f)
            {
                isScalingUp = false; // Stop scaling up
            }
        }
        else
        {
            // Handle bobbing motion
            float newY = Mathf.Sin(Time.time * bobbingSpeed) * bobbingAmount;
            transform.localPosition = new Vector3(transform.localPosition.x, transform.localPosition.y + newY, transform.localPosition.z);
        }
    }

    void OnDestroy()
    {
        if (particleEffectPrefab)
        {
            Instantiate(particleEffectPrefab, transform.position, Quaternion.identity);
        }
    }
    
    private void FindCameraTransform()
    {
        // Assuming using OVR, find the center eye anchor
        OVRCameraRig cameraRig = FindObjectOfType<OVRCameraRig>();
        if (cameraRig != null)
        {
            cameraTransform = cameraRig.centerEyeAnchor;
        }
    }
}
