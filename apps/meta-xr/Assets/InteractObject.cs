using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InteractObject : MonoBehaviour
{
    private Transform leftHandAnchor, rightHandAnchor;
    private bool isGrabbedLeft = false, isGrabbedRight = false;
    private Vector3 initialScale, initialLeftPosition, initialRightPosition;
    private Quaternion initialRotation, initialLeftRotation, initialRightRotation;
    private Vector3 grabOffset;
    private bool wasScaling = false;
    private float scaleReleaseTime;

    public float grabDelayAfterScale = 0.5f;
    public OVRInput.Button grabButton = OVRInput.Button.PrimaryHandTrigger;

    void Start()
    {
        initialRotation = transform.rotation;

        OVRCameraRig cameraRig = FindObjectOfType<OVRCameraRig>();
        if (cameraRig)
        {
            leftHandAnchor = cameraRig.leftHandAnchor;
            rightHandAnchor = cameraRig.rightHandAnchor;
        }
    }

    void Update()
    {
        bool wasGrabbingLeft = isGrabbedLeft;
        bool wasGrabbingRight = isGrabbedRight;

        CheckGrabStatus(leftHandAnchor, ref isGrabbedLeft, OVRInput.Controller.LTouch);
        CheckGrabStatus(rightHandAnchor, ref isGrabbedRight, OVRInput.Controller.RTouch);

        if (isGrabbedLeft && isGrabbedRight)
        {
            if (!wasScaling)
            {
                initialScale = transform.localScale; // Set the initial scale at the start of scaling
                SetInitialGrabState();
                wasScaling = true;
            }
            StretchAndRotate();
        }
        else if (wasScaling)
        {
            scaleReleaseTime = Time.time;
            wasScaling = false;
        }

        if (Time.time - scaleReleaseTime > grabDelayAfterScale)
        {
            if ((isGrabbedLeft || isGrabbedRight) && !(isGrabbedLeft && isGrabbedRight))
            {
                Transform grabbingHand = isGrabbedLeft ? leftHandAnchor : rightHandAnchor;
                grabOffset = transform.position - grabbingHand.position;
                MoveObject(grabbingHand);
            }
        }
    }

    void SetInitialGrabState()
    {
        initialLeftPosition = leftHandAnchor.position;
        initialRightPosition = rightHandAnchor.position;
        initialLeftRotation = leftHandAnchor.rotation;
        initialRightRotation = rightHandAnchor.rotation;
    }

    void CheckGrabStatus(Transform handAnchor, ref bool isGrabbed, OVRInput.Controller controller)
    {
        isGrabbed = OVRInput.Get(grabButton, controller);
    }

    void StretchAndRotate()
    {
        // Apply scaling based on initial and current distance between hands
        float initialDistance = Vector3.Distance(initialLeftPosition, initialRightPosition);
        float currentDistance = Vector3.Distance(leftHandAnchor.position, rightHandAnchor.position);
        float scaleMultiplier = currentDistance / initialDistance;
        transform.localScale = initialScale * scaleMultiplier;

        // Apply rotation based on the change in orientation between the initial and current hand positions
        Quaternion initialHandRotation = Quaternion.LookRotation(initialRightPosition - initialLeftPosition);
        Quaternion currentHandRotation = Quaternion.LookRotation(rightHandAnchor.position - leftHandAnchor.position);
        transform.rotation = initialRotation * Quaternion.Inverse(initialHandRotation) * currentHandRotation;
    }

    void MoveObject(Transform hand)
    {
        // Move the object to follow the hand's position, applying the initial offset
        transform.position = hand.position + grabOffset;
    }
}