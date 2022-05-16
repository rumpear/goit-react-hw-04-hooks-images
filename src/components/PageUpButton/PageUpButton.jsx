import { useInView } from 'react-intersection-observer';
import { Button, Icon, Container } from './PageUpButton.styled';

export const PageUpButton = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  return (
    <Container ref={ref}>
      {!inView && (
        <Button
          type="button"
          onClick={handleClick}
          aria-label="Go to the top of the page"
        >
          <Icon size={25}></Icon>
        </Button>
      )}
    </Container>
  );
};
