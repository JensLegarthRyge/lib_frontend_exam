import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import {
  loadHtml,
  adjustForMissingHash,
  setActiveLink,
  renderTemplate,

} from "./utils.js"
window.addEventListener("load", async () => {
  const templateHome = await loadHtml("./pages/home/home.html")

  const router = new Navigo("/", { hash: true });
  window.router = router

  adjustForMissingHash()
  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url)
        done()
      }
    })
    .on({
      "/": () => renderTemplate(templateHome, "content"),
      "/example-nav": (match) => {
      }
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)