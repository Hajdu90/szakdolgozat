

import { useKosar } from "./KosarContext";

function Kosar() {
  const { kosar } = useKosar();

  return (
    <div>
      <h2>Kosár Tartalma</h2>
      {kosar.length === 0 ? (
        <p>A kosarad még üres</p>
      ) : (
        <ul>
          {kosar.map((elem) => (
            <li key={elem.csomagId}>
              {elem.nev} - {elem.utasokSzama} fő - {elem.ar * elem.utasokSzama} Ft
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Kosar;