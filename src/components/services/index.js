import {ipcMain} from 'electron'
export function ipc(){
    ipcMain.handle('login', async (event, someArgument)=>{
      
      const  code = `Nome do Autor(a): ${someArgument}`
      return code;
    })
}
