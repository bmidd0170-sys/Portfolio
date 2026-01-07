"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  imageUrl: string | null;
}

function ProjectsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const selectedProjectIndexRef = useRef(0);
  const [mode, setMode] = useState<"fun" | "boring">("fun");

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const rotationVelocityRef = useRef(0);
  const currentRotationRef = useRef(0);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Track mode changes
  useEffect(() => {
    const updateMode = () => {
      const currentMode = document.documentElement.dataset.mode as "fun" | "boring" | undefined;
      setMode(currentMode || "fun");
    };

    updateMode();

    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || projects.length === 0 || mode === "boring") return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.01,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create group for carousel
    const group = new THREE.Group();
    group.position.z = 0;
    groupRef.current = group;
    scene.add(group);

    // Calculate circle parameters
    const radius = 1.2;
    const angleSlice = (Math.PI * 2) / projects.length;

    // Create spheres in circular arrangement
    const textureLoader = new THREE.TextureLoader();
    const spheres: THREE.Mesh[] = [];

    projects.forEach((project, index) => {
      const geometry = new THREE.IcosahedronGeometry(0.5, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: false,
        shininess: 100,
      });

      const sphere = new THREE.Mesh(geometry, material);

      // Position in circle
      const angle = angleSlice * index;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;

      // Load texture
      if (project.imageUrl) {
        textureLoader.load(
          project.imageUrl,
          (texture: THREE.Texture) => {
            (material as THREE.MeshPhongMaterial).map = texture;
            (material as THREE.MeshPhongMaterial).needsUpdate = true;
          },
          undefined,
          (error: unknown) => {
            console.error("Failed to load texture:", error);
          }
        );
      }

      group.add(sphere);
      spheres.push(sphere);
    });

    spheresRef.current = spheres;

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 1.5);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7c3aed, 0.8);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragDeltaRef.current = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      dragDeltaRef.current = e.clientX - dragStartXRef.current;
      rotationVelocityRef.current = dragDeltaRef.current * 0.003;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    containerRef.current.addEventListener("mousedown", handleMouseDown);
    containerRef.current.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (group) {
        // Drag rotation
        if (isDraggingRef.current) {
          group.rotation.y += dragDeltaRef.current * 0.0001; // slower
          currentRotationRef.current = group.rotation.y;
          dragDeltaRef.current = 0;
        }

        // Inertia/momentum
        group.rotation.y += rotationVelocityRef.current * 0.5; // slower
        currentRotationRef.current = group.rotation.y;
        rotationVelocityRef.current *= 0.95; // Damping
      }

      // Update individual sphere rotations
      spheresRef.current.forEach((sphere) => {
        sphere.rotation.x += 0.0015; // slower
      });


      // Find the frontmost sphere
      let minDiff = Infinity;
      let frontIndex = 0;
      const yRot = group.rotation.y % (2 * Math.PI);
      for (let i = 0; i < spheresRef.current.length; i++) {
        const angle = (2 * Math.PI * i) / spheresRef.current.length;
        let diff = Math.abs(Math.atan2(Math.sin(yRot - angle), Math.cos(yRot - angle)));
        if (diff < minDiff) {
          minDiff = diff;
          frontIndex = i;
        }
      }
      if (frontIndex !== selectedProjectIndexRef.current) {
        selectedProjectIndexRef.current = frontIndex;
        setSelectedProjectIndex(frontIndex);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousedown", handleMouseDown);
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationId);
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose all geometries and materials
      spheresRef.current.forEach((sphere) => {
        (sphere.geometry as THREE.BufferGeometry).dispose();
        if (Array.isArray(sphere.material)) {
          sphere.material.forEach((m) => m.dispose());
        } else {
          sphere.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [projects, mode]);

  if (loading) {
    return (
      <section
        id="projects"
        className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center relative z-10"
      >
        <p className="text-center text-slate-600">Loading projects...</p>
      </section>
    );
  }

  // Boring mode: static card grid
  if (mode === "boring") {
    return (
      <section
        id="projects"
        className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 flex flex-col"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md shadow-blue-500/30 hover:shadow-blue-400/50 transition-shadow duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Fun mode: 3D carousel
  const selectedProject = projects[selectedProjectIndex];

  return (
    <section
      id="projects"
      className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-center relative z-10"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
      <div className="w-full flex flex-col items-center gap-8">
        <div
          ref={containerRef}
          className="w-full max-w-4xl h-96 rounded-lg"
        />

        {selectedProject && (
          <div className="text-center max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">{selectedProject.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md shadow-blue-500/30 hover:shadow-blue-400/50 transition-shadow duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={selectedProject.link || "#"}
              className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View Project →
            </a>
          </div>
        )}

        <p className="text-sm text-slate-500">Drag to rotate through projects</p>
      </div>
    </section>
  );
}

export default ProjectsCarousel;
