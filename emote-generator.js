"use strict"

const layersSelector = document.querySelector(".layers-selector")
const downloadElem = document.querySelector("#DownloadElem")
const shareElem = document.querySelector("#ShareElem")

const canvas = document.querySelector("#CanvasResult")
const ctx = canvas.getContext("2d", {alpha: false})
const width = 345
const height = 345
canvas.width = width
canvas.height = height

const DEFAULT_SKIN_COLOR = "#ffe6d5"

const imagesFolder = "images"
const icon4Type = {eyes: "👁", mouth: "👄", face: "👃", accessories: "🕶️", special: "🤔"}
const layers =
    [ {label: "Hmmm Hands"           , fileName: "HmmmHands.png"     , enabled: false , type: "special"}
    , {label: "Wine"                 , fileName: "Wine.png"          , enabled: false , type: "accessories"}
    , {label: "Anger"                , fileName: "Anger-sign.png"    , enabled: false , type: "accessories"}
    , {label: "Blow"                 , fileName: "Blow.png"          , enabled: false , type: "accessories"}
    , {label: "Mustaches"            , fileName: "Mustaches.png"     , enabled: false , type: "face"}
    , {label: "Top hat"              , fileName: "TopHat.png"        , enabled: false , type: "accessories"}
    , {label: "Sunglasses"           , fileName: "CoolGlasses.png"   , enabled: false , type: "accessories"}
    , {label: "Monocle"              , fileName: "Monocle.png"       , enabled: false , type: "accessories"}

    , {label: "Eyes"                 , fileName: "WEyes.png"         , enabled: true  , type: "eyes"}
    , {label: "Absent eyes"          , fileName: "AbsentEyes.png"    , enabled: false , type: "eyes"}
    , {label: "Awoo eyes"            , fileName: "AwooEyes.png"      , enabled: false , type: "eyes"}
    , {label: "Big eyes"             , fileName: "BigEyes.png"       , enabled: false , type: "eyes"}
    , {label: "Crying eyes"          , fileName: "CryEyes.png"       , enabled: false , type: "eyes"}
    , {label: "Cute eyes"            , fileName: "CuteEyes.png"      , enabled: false , type: "eyes"}
    , {label: "Eyes looking to left" , fileName: "ToLeftEyes.png"    , enabled: false , type: "eyes"}
    , {label: "Shocked eyes"         , fileName: "Shocked.png"       , enabled: false , type: "eyes"}
    , {label: "Sleeping eyes"        , fileName: "SlipEyes.png"      , enabled: false , type: "eyes"}
    , {label: "Smug eyes"            , fileName: "InsidiousEyes.png" , enabled: false , type: "eyes"}
    , {label: "Sus eyes"             , fileName: "SusEyes.png"       , enabled: false , type: "eyes"}
    , {label: "Stare eyes"           , fileName: "StareEyes.png"     , enabled: false , type: "eyes"}
    , {label: "Weeb eyes"            , fileName: "HappyEyes.png"     , enabled: false , type: "eyes"}

    , {label: "Mouth"                , fileName: "WMouth.png"        , enabled: true  , type: "mouth"}
    , {label: "Ahegao mouth"         , fileName: "Ahegao.png"        , enabled: false , type: "mouth"}
    , {label: "Awoo mouth"           , fileName: "AwooMouth.png"     , enabled: false , type: "mouth"}
    , {label: "Dissapointed mouth"   , fileName: "Dissapointed.png"  , enabled: false , type: "mouth"}
    , {label: "Evil mouth"           , fileName: "EvilMouth.png"     , enabled: false , type: "mouth"}
    , {label: "Grin mouth"           , fileName: "Grin.png"          , enabled: false , type: "mouth"}
    , {label: "PauseChamp mouth"     , fileName: "Pause.png"         , enabled: false , type: "mouth"}
    , {label: "Pocker mouth"         , fileName: "PockerMouth.png"   , enabled: false , type: "mouth"}
    , {label: "Pog mouth"            , fileName: "Pog.png"           , enabled: false , type: "mouth"}
    , {label: "Screaming mouth"      , fileName: "DMouth.png"        , enabled: false , type: "mouth"}
    , {label: "Sad mouth"            , fileName: "SadMouth.png"      , enabled: false , type: "mouth"}
    , {label: "Smug mouth"           , fileName: "SmugMouth.png"     , enabled: false , type: "mouth"}
    , {label: "Weeb mouth"           , fileName: "HappyMouth.png"    , enabled: false , type: "mouth"}

    , {label: "Glasses frame"        , fileName: "GlassesFrame.png"  , enabled: true  , type: "accessories"}
    , {label: "Glass"                , fileName: "Glass.png"         , enabled: true  , type: "accessories"}
    , {label: "Sweat"                , fileName: "Sweat.png"         , enabled: false , type: "accessories"}
    , {label: "Angry eyebrows"       , fileName: "AngryEyebrows.png" , enabled: false , type: "face"}
    , {label: "Smily cheeks"         , fileName: "SmilyCheeks.png"   , enabled: false , type: "face"}
    , {label: "Grey Brows"           , fileName: "GrandBrows.png"    , enabled: false , type: "face"}
    , {label: "Grey Mustaches"       , fileName: "GrandMustache.png" , enabled: false , type: "face"}
    , {label: "Nose"                 , fileName: "Nose.png"          , enabled: true  , type: "face"}
    , {label: "Blush on cheeks"      , fileName: "Blush.png"         , enabled: false , type: "face"}
    , {label: "Background"           , fileName: "HeadPhones.png"    , enabled: true  , type: "special"}
    , {label: "Shadow"               , fileName: "Shadow.png"        , enabled: false , type: "accessories"}
    ]

function addRandomizeButton(type, clickHandler) {
    const randButton = document.createElement("button")
    randButton.title = type
    randButton.appendChild(document.createTextNode(`Randomize ${icon4Type[type] || type}`))
    randButton.addEventListener("click", clickHandler)

    const li = document.createElement("li")
    li.appendChild(randButton)
    layersSelector.appendChild(li)
}
addRandomizeButton("All", e => {
    layers.forEach(layer => {
        layer.enabled = !layer.unwanted && (layer.desired || Math.random() < 0.20)
        layer.checkbox.checked = layer.enabled
    })
})
addRandomizeButton("mouth", e => {
    const layersOfType = layers.filter(layer => layer.type === "mouth")
    const index = Math.floor(Math.random() * layersOfType.length)
    layersOfType.forEach((layer, i) => {
        layer.enabled = !layer.unwanted && (layer.desired || i === index)
        layer.checkbox.checked = layer.enabled
    })
})
addRandomizeButton("eyes", e => {
    const layersOfType = layers.filter(layer => layer.type === "eyes")
    const index = Math.floor(Math.random() * layersOfType.length)
    layersOfType.forEach((layer, i) => {
        layer.enabled = !layer.unwanted && (layer.desired || i === index)
        layer.checkbox.checked = layer.enabled
    })
})
addRandomizeButton("face", e => {
    const layersOfType = layers.filter(layer => layer.type === "face")
    layersOfType.forEach((layer, i) => {
        layer.enabled = !layer.unwanted && (layer.desired || Math.random() < 0.23)
        layer.checkbox.checked = layer.enabled
    })
})
addRandomizeButton("accessories", e => {
    const layersOfType = layers.filter(layer => layer.type === "accessories")
    layersOfType.forEach((layer, i) => {
        layer.enabled = !layer.unwanted && (layer.desired || Math.random() < 0.21)
        layer.checkbox.checked = layer.enabled
    })
})

let loadedImages = 0
layers.forEach((layer, i) => {
    layer.sortingShift = 0
    layer.index = i

    layer.desired = false
    layer.unwanted = false

    const input = document.createElement("input")
    input.type = "checkbox"
    input.checked = layer.enabled
    input.id = "layer-" + i
    layer.checkbox = input

    const label = document.createElement("label")
    label.appendChild(input)
    label.appendChild(document.createTextNode(`${icon4Type[layer.type]} ${layer.label}`))

    const li = document.createElement("li")
    li.appendChild(label)
    layersSelector.appendChild(li)

    layer.image = new Image()
    layer.image.src = `${imagesFolder}/${layer.fileName}`
    layer.image.addEventListener("load", e => {
        loadedImages++
        if (loadedImages === layers.length) {
            render()
            saveHistory()
        }
    })
})
const colorSelector = document.createElement("input")
colorSelector.type = "color"
colorSelector.value = DEFAULT_SKIN_COLOR
{
    const label = document.createElement("label")
    label.appendChild(document.createTextNode("Skin color"))
    label.appendChild(colorSelector)

    const li = document.createElement("li")
    li.appendChild(label)
    layersSelector.appendChild(li)
}


function render() {
    ctx.fillStyle = colorSelector.value
    ctx.fillRect(0, 0, width, height)
    const layersCopy = layers.map(x => x).sort((l1, l2) => {
        return (l1.index + l1.sortingShift) - (l2.index + l2.sortingShift)
    })
    for (let i = layersCopy.length - 1; i >= 0; i--) {
        const layer = layersCopy[i]
        if (layer.enabled) {
            ctx.drawImage(layer.image, 0, 0)
        }
    }
}

function download(name, dataString) {
    const link = document.createElement('a')
    link.download = name
    link.href = dataString
    link.click()
}

const history = []
let redoIndex = 0
const historyCanvas = document.querySelector("#CanvasHistory")
const historyCtx = historyCanvas.getContext("2d", {alpha: false})
const historySize = 48
historyCtx.fillStyle = "#393947"
historyCtx.fillRect(0, 0, historyCanvas.width, historyCanvas.height)

function updateHistoryDimentions() {
    const snapshot = historyCtx.getImageData(0, 0, historyCanvas.width, historyCanvas.height)
    historyCanvas.width = innerWidth
    historyCanvas.height = historySize
    historyCtx.fillStyle = "#393947"
    historyCtx.fillRect(0, 0, historyCanvas.width, historyCanvas.height)
    historyCtx.putImageData(snapshot, 0, 0)
}
updateHistoryDimentions()

const HISTORY_GAP = 2
function saveHistory() {
    const historyEntry = serializeState()
    if (historyEntry !== history[history.length - 1]) {
        historyCtx.drawImage(historyCanvas, historySize + HISTORY_GAP, 0)
        historyCtx.drawImage(canvas, 0, 0, historySize, historySize)
        history.push(historyEntry)
    }
    redoIndex = history.length - 1
}
function serializeState() {
    const bits = layers.map(l=>l.enabled ? 1:0)
    let index = 0
    let byte = 0
    const bytes = []
    for (let i = 0; i < bits.length; i++) {
        if (index === 8) {
            index %= 8
            bytes.push(byte)
            byte = 0
        }
        if (bits[i]) {
            byte += 2 ** index
        }
        index++
    }
    if (index !== 0) {
        bytes.push(byte)
    }
    return bytes.map(toHex).join("")+"s"+colorSelector.value.slice(1)
}
function deserializeState(entry) {
    const bitmask_color = entry.split("s")
    if (bitmask_color.length != 2) {
        console.error("Wrong state", entry)
        return
    }
    const bitmask = bitmask_color[0]
    const color = bitmask_color[1]
    const bits = []
    Array.from(bitmask.matchAll(/../g)).map(byte=>parseInt(byte, 16)).map(byte => {
        for (let i = 0; i < 8; i++) {
            bits.push(Boolean(2 ** i & byte))
        }
    })
    bits.forEach((bit, i) => {
        if (i >= layers.length) return;
        layers[i].enabled = bit
        layers[i].checkbox.checked = bit
    })
    colorSelector.value = "#" + color
    render()
}

if (location.search) {
    deserializeState(location.search.slice(1))
}

if (navigator.canShare && navigator.canShare({url: location.href})) {
    shareElem.addEventListener("click", e => {
        const state = history[redoIndex]
        const url = location.href.split("?")[0] + "?" + state
        navigator.share({url: url})
        history.replaceState(null, '', url);
    })
} else {
    // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return true
    };
    shareElem.addEventListener("click", e => {
        const state = history[redoIndex]
        const url = location.href.split("?")[0] + "?" + state
        alert(copyToClipboard(url) ? `Copied url to clipboard: ${url}` : `Failed to copy the url: ${url}`)
        history.replaceState(null, '', url);
    })
}

window.addEventListener("resize", updateHistoryDimentions)

layersSelector.addEventListener("contextmenu", e => {
    e.preventDefault()
    if (e.target.tagName !== "LABEL" && e.target.tagName !== "INPUT") return;
    let target = e.target
    if (e.target.tagName === "LABEL") target = target.firstChild;
    const index = target.id.slice("layer-".length)
    if (index) {
        layers[index].checkbox.checked = false
        layers[index].unwanted = true
        layers[index].checkbox.parentElement.classList.add("unwanted")
        layers[index].enabled = false
    }
    render()
    saveHistory()
})
let lastSelectedLayer = -1
layersSelector.addEventListener("click", e => {
    if (e.target.tagName === "LABEL") return;
    const index = e.target.id.slice("layer-".length)
    if (index) {
        lastSelectedLayer = Number(index)
        const layer = layers[index]
        if (e.shiftKey) {
            layer.checkbox.checked = true
            layer.desired = true
            layer.checkbox.parentElement.classList.add("desired")
        } else if (layer.desired) {
            layer.desired = false
            layer.checkbox.parentElement.classList.remove("desired")
        }
        if (e.ctrlKey) {
            layer.checkbox.checked = false
            layer.unwanted = true
            layer.checkbox.parentElement.classList.add("unwanted")
        } else if (layer.unwanted) {
            layer.unwanted = false
            layer.checkbox.parentElement.classList.remove("unwanted")
        }
    }
    layers.forEach(layer => {
        layer.enabled = layer.checkbox.checked
    })
    render()
    saveHistory()
})
colorSelector.addEventListener("input", render)
colorSelector.addEventListener("change", saveHistory)
downloadElem.addEventListener("click", e => {
    download(serializeState(), canvas.toDataURL("image/png"))
})

historyCanvas.addEventListener("click", e => {
    const x = e.offsetX
    const index = Math.floor(x / (historySize + HISTORY_GAP))
    if (index > history.length - 1) return;
    redoIndex = history.length - 1 - index
    deserializeState(history[redoIndex])
})

// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    m--
    i = Math.floor(Math.random() * m);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
const accordingToShift = (l1, l2) => {
    return (l1.index + l1.sortingShift) - (l2.index + l2.sortingShift)
}
function updateLayerOrder() {
    layers.map(x=>x).sort(accordingToShift).forEach(l => {
        layersSelector.append(l.checkbox.parentElement.parentElement)
    })
    layersSelector.append(colorSelector.parentElement.parentElement)
}

function toHex(numb) {
    return numb.toString(16).padStart(2, "0")
}

function randomColor() {
    const r = toHex(Math.floor(Math.random() * 256))
    const g = toHex(Math.floor(Math.random() * 256))
    const b = toHex(Math.floor(Math.random() * 256))
    return "#" + r + g + b;
}
const randButtons = document.querySelectorAll(".layers-selector button")
window.addEventListener("keydown", e => {
    switch (e.code) {
        case "KeyR":
            if (e.ctrlKey === false) {
                const index = Math.floor(Math.random() * randButtons.length)
                randButtons[index].click()
            } break
        case "KeyD":
            downloadElem.click()
            break
        case "KeyC":
            if (e.ctrlKey === false) {
                colorSelector.value = e.shiftKey ? DEFAULT_SKIN_COLOR : randomColor()
                render()
                saveHistory()
            } break
        case "KeyZ":
            if (e.ctrlKey) {
                if (e.shiftKey === false) {
                    redoIndex = Math.max(0, redoIndex - 1)
                    deserializeState(history[redoIndex])
                    break
                }
            } // fall through
        case "KeyY":
            if (e.ctrlKey) {
                redoIndex = Math.min(history.length - 1, redoIndex + 1)
                deserializeState(history[redoIndex])
            } break
        case "KeyS": {
                let indexes = new Array(layers.length).fill(0).map((_, i) => i)
                if (e.shiftKey === false) indexes = shuffle(indexes)
                layers.forEach((l, i) => {
                    l.sortingShift = indexes[i] - l.index
                })
                updateLayerOrder()
                render()
            } break
        case "ArrowLeft":
            if (lastSelectedLayer >= 0) {
                const layer = layers[lastSelectedLayer]
                if (lastSelectedLayer + layer.sortingShift > 0) {
                    const otherLayer = layers.map(x=>x).sort(accordingToShift)[lastSelectedLayer + layer.sortingShift - 1]
                    layer.sortingShift -= 1
                    otherLayer.sortingShift += 1
                    updateLayerOrder()
                }
                render()

            } break
        case "ArrowRight":
            if (lastSelectedLayer >= 0) {
                const layer = layers[lastSelectedLayer]
                if (lastSelectedLayer + layer.sortingShift < layers.length - 1) {
                    const otherLayer = layers.map(x=>x).sort(accordingToShift)[lastSelectedLayer + layer.sortingShift + 1]
                    layer.sortingShift += 1
                    otherLayer.sortingShift -= 1
                    updateLayerOrder()
                }
                render()
            } break
    }
})
