<template>
<div>

  <h2 class="Teste Milagro"></h2>
  <h2 id="version"></h2>
  </div>
</template>

<script>
export default {};

const { ipcRenderer } = require("electron");
const version = document.getElementById("version");

ipcRenderer.send("app_version");
ipcRenderer.on("app_version", (event, arg) => {
  ipcRenderer.removeAllListeners("app_version");
  version.innerText = "Version " + arg.version;
});
</script>

<style>
.title {
  color: #000;
  font-weight: bold;
  font-size: 20;
}
</style>