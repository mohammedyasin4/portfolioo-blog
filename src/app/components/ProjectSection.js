"use client";
import { useMemo, useState } from "react";
import ProjectModel from "./ProjectModel";

const ProjectSection = () => {
  const projects = useMemo(() => [
    { id: 1, title: "Weather App", fullDescription: "A simple and intuitive application that provides real-time weather updates, forecasts, and temperature details for any location. Built with a focus on clarity and ease of use.", tags: ["React", "API", "Weather"], description: "A weather application built with React and OpenWeatherMap API.", image: "/images/weather.png" },
    { id: 2, title: "BlackJack Game", fullDescription: "A classic card game implementation where players can compete against the dealer. Built with a focus on game logic and user experience.", tags: ["JavaScript", "HTML", "CSS"], description: "A BlackJack game built with JavaScript and HTML5.", image: "/images/photo-1655159428752-c700435e9983.jpg" },
    { id: 3, title: "E-commerce Site", fullDescription: "A fully functional online store featuring product listings, a shopping cart, and a checkout process. Designed with responsiveness and user-friendliness in mind.", tags: ["Next.js", "Tailwind CSS", "Stripe"], description: "An e-commerce site built with Next.js and Stripe API.", image: "/images/ecommerce.png" },
    { id: 4, title: "Portfolio Website", fullDescription: "A personal portfolio website to showcase my projects, skills, and experience. Built with a focus on aesthetics and user experience.", tags: ["React", "Next.js", "Tailwind CSS"], description: "A portfolio website built with React and Next.js.", image: "/images/portfolio.png" }
  ], []);

  // keep storing the ID (number) — not the object
  const [selectedProject, setSelectedProject] = useState(null); // null | number

  // Resolve the project object whenever the ID changes
  const activeProject = useMemo(
    () => (selectedProject == null ? null : projects.find(p => p.id === selectedProject) || null),
    [selectedProject, projects]
  );

  const handleProjectClick = (id) => setSelectedProject(id);
  const handleCloseModal = () => setSelectedProject(null);

  // NON-CIRCULAR next/prev using the stored ID
  const handleNextProject = () => {
    if (selectedProject == null) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject);
    if (currentIndex === -1 || currentIndex === projects.length - 1) return; // at end → do nothing
    setSelectedProject(projects[currentIndex + 1].id);
  };

  const handlePrevProject = () => {
    if (selectedProject == null) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject);
    if (currentIndex <= 0) return; // at start (or not found) → do nothing
    setSelectedProject(projects[currentIndex - 1].id);
  };

  return (
    <section id="projects" className="px-4 py-32 sm:px-6">
      <h2 className="text-2xl font-bold mb-10 text-center">Featured Projects</h2>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="text-left bg-gray-700/30 backdrop-blur-sm p-4 border border-transparent rounded-lg transition-all duration-300 hover:border-gray-100 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>

            <div className="mb-5">
              {project.tags.map((tag, i) => (
                <span
                  key={`${project.id}-${tag}-${i}`}
                  className="inline-block border border-amber-50/25 bg-gray-600/50 text-red-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p>{project.description}</p>
          </button>
        ))}
      </div>

      {activeProject && (
        <ProjectModel
          project={activeProject}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </section>
  );
};

export default ProjectSection;
