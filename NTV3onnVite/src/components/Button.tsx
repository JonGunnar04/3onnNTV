type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ onClick }: Props) {
  return <button onClick={onClick}>submit</button>;
}