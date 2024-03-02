using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Meta.XR.Depth;

    public class OcclusionController : MonoBehaviour
    {
        [SerializeField]
        private OcclusionType _occlusionType;

        [SerializeField]
        private Renderer _renderer;

        private Material _material;

        private EnvironmentDepthTextureProvider _depthTextureProvider;


        private void Awake()
        {
            _material = _renderer.material;

            _depthTextureProvider.RemoveHands(false);
            
        }

        void Update()
        {
            UpdateMaterialKeywords();
        }

        private void UpdateMaterialKeywords()
        {
            switch (_occlusionType)
            {
                case OcclusionType.HardOcclusion:
                    _material.DisableKeyword(EnvironmentDepthOcclusionController.SoftOcclusionKeyword);
                    _material.EnableKeyword(EnvironmentDepthOcclusionController.HardOcclusionKeyword);
                    break;
                case OcclusionType.SoftOcclusion:
                    _material.DisableKeyword(EnvironmentDepthOcclusionController.HardOcclusionKeyword);
                    _material.EnableKeyword(EnvironmentDepthOcclusionController.SoftOcclusionKeyword);
                    break;
                default:
                    _material.DisableKeyword(EnvironmentDepthOcclusionController.HardOcclusionKeyword);
                    _material.DisableKeyword(EnvironmentDepthOcclusionController.SoftOcclusionKeyword);
                    break;
            }
        }
    }