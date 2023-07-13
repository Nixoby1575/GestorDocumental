import { Component, AfterViewInit } from '@angular/core';
interface UploadedFile {
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
}

@Component({
  selector: 'app-my-files',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})






export class MyfilesComponent {
  selectedFile: File | null = null;
  uploadedFiles: UploadedFile[] = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Obtener el contenido del archivo como una cadena base64
        const fileContent = e.target.result as string;

        // Guardar el archivo localmente en el localStorage
        const fileData: UploadedFile = {
          name: this.selectedFile?.name || '',
          type: this.selectedFile?.type || '',
          size: this.selectedFile?.size || 0,
          uploadDate: new Date()
        };
        localStorage.setItem('uploadedFile', JSON.stringify(fileData));

        // Agregar el archivo a la lista de archivos subidos
        this.uploadedFiles.push(fileData);

        // Limpiar la selección de archivo
        this.selectedFile = null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getFileURL(file: UploadedFile): string {
    const fileData = localStorage.getItem('uploadedFile');
    if (fileData && this.selectedFile) {
      const parsedFileData: UploadedFile = JSON.parse(fileData);
      if (parsedFileData.name === file.name) {
        return this.createObjectURL(this.selectedFile);
      }
    }
    return '';
  }

  private createObjectURL(file: File): string {
    if (window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(file);
    } else if (window.webkitURL && window.webkitURL.createObjectURL) {
      return window.webkitURL.createObjectURL(file);
    } else {
      return '';
    }
  }

  






  /*Muestra los archivos XML y JSON*/
  mostrarTablaXML: boolean = false;
  mostrarTablaJSON: boolean = false;
  documentsXML: any[] = [];
  documentsJSON: any[] = [];

  toggleTablaXML(): void {
    this.mostrarTablaXML = !this.mostrarTablaXML;

    if (this.mostrarTablaXML) {
      this.mostrarTablaXMLFunc();
    }
  }

  toggleTablaJSON(): void {
    this.mostrarTablaJSON = !this.mostrarTablaJSON;

    if (this.mostrarTablaJSON) {
      this.mostrarTablaJSONFunc();
    }
  }

  mostrarTablaXMLFunc(): void {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
      <document-management>
        <document>
          <id>1</id>
          <title>Documento 1</title>
          <author>John Doe</author>
          <date>2023-06-10</date>
          <description>Descripción del documento 1.</description>
          <file>documento1.pdf</file>
        </document>
        <document>
          <id>2</id>
          <title>Documento 2</title>
          <author>Jane Smith</author>
          <date>2023-06-09</date>
          <description>Descripción del documento 2.</description>
          <file>documento2.docx</file>
        </document>
        <document>
          <id>3</id>
          <title>Documento 3</title>
          <author>Michael Johnson</author>
          <date>2023-06-08</date>
          <description>Descripción del documento 3.</description>
          <file>documento3.xlsx</file>
        </document>
      </document-management>`;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const documentElements = xmlDoc.getElementsByTagName("document");

    this.documentsXML = [];

    for (let i = 0; i < documentElements.length; i++) {
      const id = documentElements[i].getElementsByTagName("id")[0].textContent;
      const title = documentElements[i].getElementsByTagName("title")[0].textContent;
      const author = documentElements[i].getElementsByTagName("author")[0].textContent;
      const date = documentElements[i].getElementsByTagName("date")[0].textContent;
      const description = documentElements[i].getElementsByTagName("description")[0].textContent;
      const file = documentElements[i].getElementsByTagName("file")[0].textContent;

      this.documentsXML.push({ id, title, author, date, description, file });
    }

    this.mostrarTablaXML = true;
  }
  mostrarTablaJSONFunc(): void {
    const jsonString = `[
      {
        "id": 1,
        "title": "Documento 1",
        "author": "John Doe",
        "date": "2023-06-10",
        "description": "Descripción del documento 1.",
        "file": "documento1.pdf"
      },
      {
        "id": 2,
        "title": "Documento 2",
        "author": "Jane Smith",
        "date": "2023-06-09",
        "description": "Descripción del documento 2.",
        "file": "documento2.docx"
      },
      {
        "id": 3,
        "title": "Documento 3",
        "author": "Michael Johnson",
        "date": "2023-06-08",
        "description": "Descripción del documento 3.",
        "file": "documento3.xlsx"
      }
    ]`;

    this.documentsJSON = JSON.parse(jsonString);
  }
}
