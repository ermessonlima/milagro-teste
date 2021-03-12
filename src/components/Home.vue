<template>
  <div>
    <v-container class="box-card">
      <Title />
      <p id="version"></p>
      <div class="images">
        <div v-for="img in posts" :key="img" class="col">
          <v-img
            class="imagesList"
            lazy-src="https://picsum.photos/id/11/10/6"
            :src="img.download_url"
            v-on:click="showAuthor(img.author)"
          >
          </v-img>
          <h1 class="text-card">{{ img.author }}</h1>
        </div>
      </div>
    </v-container>
    <div id="notification" class="hidden">
      <p id="message"></p>
      <button v-on:click="closeNotification()" id="close-button">Close</button>
      <button v-on:click="restartApp()" id="restart-button" class="hidden">
        Restart
      </button>
    </div>
  </div>
</template>


 

<script>
import axios from "axios";
import Title from "./Title";
import "./services";

import { ipcRenderer } from "electron";

const version = document.getElementById("version");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

export default {
  components: {
    Title,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    showAuthor(someArgument) {
    ipcRenderer.invoke('login', someArgument).then((result) => {
      alert(result)
     
})
  
    },
  },

  created() {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=6")
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  closeNotification() {
    notification.classList.add("hidden");
  },

  restartApp() {
    ipcRenderer.send("restart_app");
  },
};

ipcRenderer.send("app_version");
ipcRenderer.on("app_version", (event, arg) => {
  ipcRenderer.removeAllListeners("app_version");
  version.innerText = "Version " + arg.version;
});

ipcRenderer.on("update_available", () => {
  ipcRenderer.removeAllListeners("update_available");
  message.innerText = "A new update is available. Downloading now...";
  notification.classList.remove("hidden");
});
ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Update Downloaded. It will be installed on restart. Restart now?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});
</script>

<style>
.box-card {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.images {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.col {
  text-align: center;
  background: rgb(201, 201, 201);
  border-radius: 20px;
  flex: 1;
}
/*== Cards ==*/

.col:hover {
  background: rgb(100, 99, 99);
}

.imagesList {
  width: 400px;
  border-radius: 10px;
  cursor: pointer;
  border-radius: 10px;
  background: rgb(201, 201, 201);
  -webkit-box-shadow: 0px 0px 9px 2px rgb(65, 61, 62);
  -moz-box-shadow: 0px 0px 9px 2px rgb(100, 100, 100);
  box-shadow: 0px 0px 9px 2px rgb(94, 91, 91);
}

/*== Text Card ==*/
.text-card {
  font-size: 20px;
  font-weight: "bold";
}

#notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.hidden {
  display: none;
}
</style>