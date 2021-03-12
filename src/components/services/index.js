import {ipcMain} from 'electron'
export function ipc(){
    ipcMain.handle('alertImage', async (event, someArgument)=>{
      const  code = `Nome do Autor(a): ${someArgument}`
      return code;
    })
}
