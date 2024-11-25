import { Person } from "./Person";
import "../Person.css";

export function People({ dane }) {
  if (!dane || dane.length === 0) {
    return (
      <>
        <h3>Brak dodanych członków rodziny.</h3>
      </>
    );
  } else {
    return dane.map((e, key) => {
      return <Person dane={e} key={key} />;
    });
  }
}
