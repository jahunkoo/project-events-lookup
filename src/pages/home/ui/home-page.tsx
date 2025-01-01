import { ProjectsDropdownMenu } from './projects-dropdown-menu';
import { EventsTable } from './events-table';
import { PeriodButtonGroup } from './period-button-group';

export const HomePage = () => {
  return (
    <div className="h-screen flex flex-col px-5 py-8">
      <div className="flex gap-4">
        <ProjectsDropdownMenu />
        <PeriodButtonGroup />
      </div>
      <div className="py-5 flex-auto ">
        <EventsTable />
      </div>
    </div>
  );
};
