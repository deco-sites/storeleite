

// notice that using the same types from the loaders
// it will be easier to use the data from the loaders
// on deco.cx admin

interface Props {
  title?: string
}

/**
 * @title This name will appear on the admin
 */
export default function Section(props: Props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}
