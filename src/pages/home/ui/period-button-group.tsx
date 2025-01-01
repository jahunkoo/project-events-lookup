import { ButtonGroup, Button } from '@/shared/ui';

export const PeriodButtonGroup = () => {
  return (
    <ButtonGroup>
      <Button size="sm" variant="outline">
        Today
      </Button>
      <Button size="sm" variant="outline">
        Yesterday
      </Button>
      <Button size="sm" variant="outline">
        7D
      </Button>
      <Button size="sm" variant="outline">
        30D
      </Button>
      <Button size="sm" variant="outline">
        3M
      </Button>
      <Button size="sm" variant="outline">
        6M
      </Button>
      <Button size="sm" variant="outline">
        12M
      </Button>
      <Button size="sm" variant="outline">
        Custom
      </Button>
    </ButtonGroup>
  );
};
