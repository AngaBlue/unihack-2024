using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RemoveParticles : MonoBehaviour
{
    void Start()
    {
        Destroy(gameObject, GetComponent<ParticleSystem>().main.duration);
    }
}