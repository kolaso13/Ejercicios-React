import { useEffect, useRef, useState } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import * as XLSX from "xlsx";
//ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);
function App() {
  const [items, setItems] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setUsuarios(d);
    });
  };

  const hotTableComponent = useRef(null);
  useEffect(() => {
    function getData() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUsuarios(data));
    }

    getData();
  }, []);

  const descargar = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin("exportFile");

    pluginDescarga.downloadFile("csv", {
      filename: "usuarios",
      fileExtension: "csv",
      MimeType: "text/csv",
      columnHeaders: true,
      rowHeaders: true,
    });
  };
  return (
    <div className="App">
      {console.log(items)}
      {console.log(usuarios)}
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br />
      <button onClick={() => descargar()}>Descargar</button>
      {usuarios && (
        <HotTable
          ref={hotTableComponent}
          language={esMX.languageCode}
          data={usuarios}
          licenseKey="non-commercial-and-evaluation"
          colHeaders={true}
          columnSorting={true}
          mergeCells={false}
          contextMenu={["row_above", "row_below", "remove_row"]}
        >
          <HotColumn data="id" readOnly={true} title="id" />
          <HotColumn data="name" title="name" />
          <HotColumn data="username" title="username" />
          <HotColumn data="email" title="email" />
          {console.log(usuarios)}
          {usuarios.address ? (
            <HotColumn data="street" title="street1" />
          ) : (
            <HotColumn data="address.street" title="street" />
          )}

          <HotColumn data="address.city" title="address.city" />
        </HotTable>
      )}
    </div>
  );
}

export default App;
