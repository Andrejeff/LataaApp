const fs = window.require('fs');
const dl = window.require('ytdl-core');
const ipcRenderer = window.require('electron').ipcRenderer;
const clipboard = window.require('electron').clipboard
const remote = window.require('electron').remote;
const shell = window.require('electron').shell
const app = remote.app;

const downloads = document.getElementById('downloads');
const update = document.getElementById('update');
const nappi = document.getElementById('nappi');
const text = document.getElementById('text');
const exit = document.getElementById('exit');
const dir = app.getPath('videos') + '/LataaApp'

text.addEventListener('click', () => {
    text.value = clipboard.readText();
});

nappi.addEventListener('click', (e) => {
    e.preventDefault();
    if(!text.value) return swal("Error", "Linkkiä ei ole!", "error");
    dl.getInfo(text.value, (err, info) => {
        if (err) return swal("Error", "En tunnista linkkiä!", "error");
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const stream = dl(text.value, { quality: "highestaudio", format: "mp3" })
            .pipe(fs.createWriteStream(dir + "/" + info.title + ".mp3"))
            
        stream.on('finish', () => {
            return swal("Valmis", "Video ladattu!", "success");
        });
    })
});

downloads.addEventListener('click', () => {
    shell.showItemInFolder(dir)
})

exit.addEventListener('click', () => {
    window.close()
})

update.addEventListener('click', () => {
    ipcRenderer.send('quitAndInstall')
})

ipcRenderer.on('log', function(event, text) {
    console.log('[Electron Main]: ', text)
})

ipcRenderer.on('updateReady', function(event, text) {
    update.innerHTML = "Päivitä App!";
})

document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});
