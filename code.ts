// UDS File Builder

// Cover component key
const coverKey = "95dc19cd0cce92e1df7483dfe10d72695d8e627f";

// Page names
let FigmaPages = [
  "–––––––––––––––––––––––––––––––",
  "🟢 Handoff - Ready for dev",
  "      ↪ Flow",
  "      ↪ Prototype",
  "–––––––––––––––––––––––––––––––",
  "🎨 Exploration",
  "     ↪ User flow",
  "     ↪ Benchmark",
  "     ↪ Sandbox",
  "–––––––––––––––––––––––––––––––",
  "📂 Assets",
  "📦 Archive",
  "🤖 Local components"
];

let run = async () => {

  // Define background color to #f5f5f5
  const backgroundColor = { r: 0.96078431373, g: 0.96078431373, b: 0.96078431373 }; // values RGB for #f5f5f5

  

  // Create cover page
  let coverPage = figma.currentPage;
  coverPage.name = "🔥 Cover";

  // Add Driveway XD Thumbnail library component to cover page
  // The component key is stored as a variable earlier in the SRC
  // Information on how to get the key: 
  let libraryCover = await figma.importComponentByKeyAsync(coverKey)

  // Create cover frame
  let coverFrame = figma.createFrame()
  
  // Name cover frame
  coverFrame.name = "Cover";
  
  // Add cover frame to cover page
  coverPage.appendChild(coverFrame);
  
  // Add library cover to cover frame
  coverFrame.appendChild(libraryCover.createInstance());
  
  // Resize cover frame to match library cover
  coverFrame.resize(libraryCover.width, libraryCover.height);

  coverFrame.backgrounds = [];

  // zoom into the cover, or else it'll be larger than the user's viewport
  const nodes = [];
  nodes.push(coverFrame);
  figma.viewport.scrollAndZoomIntoView(nodes);

  // Update year
  // nothing here yet...
  // need to find the layer name
  // need to create a variable for current year
  // need to update layer with a string equal to current year. 

  // Update Project name if file name is != 'untitled'
  // the thumbnail layer name to edit is: Project Name
  // const projectName = figma.currentPage.findOne(n => n.name === "Project Name");

  // Set cover frame as file thumbnail
  figma.setFileThumbnailNodeAsync(coverFrame);

  // Create other pager
  for (let page of FigmaPages) {
    let newPage = figma.createPage();
    newPage.name = page;
  }

  // Get pages by name

  let handoffPage = figma.root.findOne(node => node.name === "🟢 Handoff - Ready for dev") as PageNode;
  let explorationPage = figma.root.findOne(node => node.name === "🎨 Exploration") as PageNode;
  let assetsPage = figma.root.findOne(node => node.name === "📂 Assets") as PageNode;
  let archivePage = figma.root.findOne(node => node.name === "📦 Archive") as PageNode;
  let localComponentsPage = figma.root.findOne(node => node.name === "🤖 Local components") as PageNode;

  // Importa los componentes correspondientes usando las claves
  let newComponent1 = await figma.importComponentByKeyAsync("6e3f1bd046545fcddf6133ff8c15b83135793958" as string);
  let newComponent2 = await figma.importComponentByKeyAsync("735118f178a6e8498424b3db23d9519e5f3c60ca" as string);
  let newComponent3 = await figma.importComponentByKeyAsync("14298fd2a2b54c97cfa24a4d5a710a37b6332d55" as string);
  let newComponent4 = await figma.importComponentByKeyAsync("36e1da82a5f0c20f2068b50b29e3fda1a3399bd7" as string);
  let newComponent5 = await figma.importComponentByKeyAsync("d09873659dd80caaaeebc18914288980fb2bed7b" as string);

  // Verifica si la importación de los componentes fue exitosa
  if (!newComponent1) {
      figma.notify("Error al importar el componente de 🟢 Handoff - Ready for dev");
      figma.closePlugin();
  }
  if (!newComponent2) {
      figma.notify("Error al importar el componente de 🎨 Exploration");
      figma.closePlugin();
  }
  if (!newComponent3) {
      figma.notify("Error al importar el componente de 📂 Assets");
      figma.closePlugin();
  }
  if (!newComponent4) {
      figma.notify("Error al importar el componente 📦 Archive");
      figma.closePlugin();
  }
  if (!newComponent5) {
      figma.notify("Error al importar el componente 🤖 Local components");
      figma.closePlugin();
  }

  // Agregar instancias de componentes a las páginas correspondientes
  handoffPage.appendChild(newComponent1.createInstance());
  explorationPage.appendChild(newComponent2.createInstance());
  assetsPage.appendChild(newComponent3.createInstance());
  archivePage.appendChild(newComponent4.createInstance());
  localComponentsPage.appendChild(newComponent5.createInstance());

  // Change the background color in canvas for all pages
  for (const page of figma.root.children) {
    page.backgrounds = [{ type: 'SOLID', color: backgroundColor }];
  }


  // Done!
  figma.notify("Por favor, cambia el nombre del archivo por [Vertical] - [Squad] - [Project] - [Track]");
  figma.closePlugin("Archivo configurado correctamente 🎉");
}

run();