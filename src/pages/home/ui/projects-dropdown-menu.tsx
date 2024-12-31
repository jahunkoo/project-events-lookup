'use client';

import { useFetchProjectsQuery } from '../api/queries';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/shared/ui';
import { useState } from 'react';
import { useProjectStore } from '../model/store/project-store';

export const ProjectsDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: projects } = useFetchProjectsQuery();
  const { project: selectedProject, setProject } = useProjectStore();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {selectedProject ? selectedProject.displayName : 'Select Project'}
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {projects?.map((project) => (
          <DropdownMenuCheckboxItem
            key={project.id}
            checked={selectedProject && selectedProject.id === project.id}
            onCheckedChange={(checked) => {
              if (checked) setProject(project);
            }}>
            {project.displayName}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
