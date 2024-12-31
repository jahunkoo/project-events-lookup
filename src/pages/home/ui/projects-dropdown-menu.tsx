'use client';

import { useProjectListQuery } from '../api/queries';
import { ChevronDown } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { useState } from 'react';

const ProjectsDropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: projects } = useProjectListQuery();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Project
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {projects?.map(({ displayName }) => <DropdownMenuItem>{displayName}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectsDropdownMenu;
