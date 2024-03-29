"use strict"

const layersSelector = document.querySelector(".layers-selector")
const downloadElem = document.querySelector("#DownloadElem")
const shareElem = document.querySelector("#ShareElem")

const randomizationSelector = document.querySelector("#randomization-selector")
const includingColorElem = document.querySelector("#including-color")
const limitEyesElem = document.querySelector("#limit-eyes")
const limitMouthElem = document.querySelector("#limit-mouth")
const limitFaceElem = document.querySelector("#limit-face")
const limitAccessoriesElem = document.querySelector("#limit-accessories")

const shuffleElem = document.querySelector("#Shuffle")
const includingOrderElem = document.querySelector("#including-order")

const canvas = document.querySelector("#CanvasResult")
const ctx = canvas.getContext("2d", {alpha: false})
const width = 345
const height = 345
canvas.width = width
canvas.height = height

const DEFAULT_SKIN_COLOR = "#ffe6d5"

const imagesFolder = "images"
const types =
    { eyes:        {icon: "👁", limit: limitEyesElem}
    , mouth:       {icon: "👄", limit: limitMouthElem}
    , face:        {icon: "👃", limit: limitFaceElem}
    , accessories: {icon: "🕶️", limit: limitAccessoriesElem}
    }
const layers =
    [ {label: "Hmmm Hands"           , fileName: "HmmmHands.png"     , enabled: false , type: "accessories"}
    , {label: "Wine"                 , fileName: "Wine.png"          , enabled: false , type: "accessories"}
    , {label: "Anger"                , fileName: "Anger-sign.png"    , enabled: false , type: "accessories"}
    , {label: "Blow"                 , fileName: "Blow.png"          , enabled: false , type: "accessories"}
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

    , {label: "Mustaches"            , fileName: "Mustaches.png"     , enabled: false , type: "face"}

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
    , {label: "Background"           , fileName: "HeadPhones.png"    , enabled: true  , type: "face"}
    , {label: "Shadow"               , fileName: "Shadow.png"        , enabled: false , type: "accessories"}
    ]

randomizationSelector.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    switch(e.target.id) {
        case "Random-all":
            if (limitEyesElem.checked || limitMouthElem.checked || limitFaceElem.checked || limitAccessoriesElem.checked) {
                randOfType("eyes")
                randOfType("mouth")
                randOfType("face")
                randOfType("accessories")
            } else {
                layers.forEach(layer => {
                    layer.enabled = !layer.unwanted && (layer.desired || Math.random() < 0.20)
                    layer.checkbox.checked = layer.enabled
                })
            }
            if (includingColorElem.checked) {
                colorSelector.value = randomColor()
            }
            if (includingOrderElem.checked) {
                shuffleLayers(false)
                applyOrderOfLayers()
            }
            break
        case "Random-eyes":
            randOfType("eyes")
            break
        case "Random-mouth":
            randOfType("mouth")
            break
        case "Random-face":
            randOfType("face")
            break
        case "Random-accessories":
            randOfType("accessories")
            break
        case "Random-color":
            colorSelector.value = randomColor()
            break
        case "Reset-color":
            colorSelector.value = DEFAULT_SKIN_COLOR
            break
        case "Shuffle":
            shuffleLayers(false)
            applyOrderOfLayers()
            break
        case "Order-up":
            layerUp()
            break
        case "Order-down":
            layerDown()
            break
        case "Reset-order":
            shuffleLayers(true)
            applyOrderOfLayers()
            break
        default:
            console.error("Unknown button id", e.target.id)
    }
    render()
    saveHistory()
})
function randOfType(type) {
    const layersOfType = layers.filter(layer => layer.type === type)
    if (types[type].limit.checked) {
        const index = Math.floor(Math.random() * layersOfType.length)
        layersOfType.forEach((layer, i) => {
            layer.enabled = !layer.unwanted && (layer.desired || i === index)
            layer.checkbox.checked = layer.enabled
        })
    } else {
        layersOfType.forEach((layer, i) => {
            layer.enabled = !layer.unwanted && (layer.desired || Math.random() < 2 / layersOfType.length)
            layer.checkbox.checked = layer.enabled
        })
    }
}

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
    label.appendChild(document.createTextNode(`${types[layer.type].icon} ${layer.label}`))

    const li = document.createElement("li")
    li.appendChild(label)
    layersSelector.appendChild(li)

    layer.image = new Image()
    layer.image.src = `${imagesFolder}/${layer.fileName}`
    layer.image.addEventListener("load", e => {
        loadedImages++
        if (loadedImages === layers.length) {
            render()
        }
    })
})
const unicodeSelector = document.createElement("input")
unicodeSelector.type = "text"
unicodeSelector.value = ""
unicodeSelector.placeholder = ""
unicodeSelector.classList.add("unicode-eyes")
unicodeSelector.addEventListener("focus", e => {
  e.currentTarget.select()
})
unicodeSelector.addEventListener("input", e => {
  // TODO: split by grapheme and leave only last one
  // https://stackoverflow.com/questions/35223206/how-to-split-unicode-string-to-characters-in-javascript
  render()
})
{
    const label = document.createElement("label")
    label.appendChild(document.createTextNode("Unicode eyes"))
    label.appendChild(unicodeSelector)

    const li = document.createElement("li")
    li.appendChild(label)
    layersSelector.appendChild(li)
}

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
    const layersCopy = layers.map(copyRefs).sort(accordingToShift)
    for (let i = layersCopy.length - 1; i >= 0; i--) {
        const layer = layersCopy[i]
        if (layer.enabled) {
            ctx.drawImage(layer.image, 0, 0)
        }
    }
    // TODO: implement font-size setting
    // TODO: implement a way to change order of unicode eyes layer
    // TODO: add unicode serialization
    let eyeSymbol = unicodeSelector.value
    const leftEyeX = 150
    const leftEyeY = 120
    const rightEyeX = 214
    const rightEyeY = 138
    const leftEyeA = 0.05
    const rightEyeA = 0.14
    ctx.fillStyle = "black"
    ctx.save()
    ctx.textAlign = "right"
    ctx.font = "100px sans-serif"
    ctx.translate(leftEyeX, leftEyeY)
    ctx.rotate(0.2-leftEyeA)
    ctx.fillText(eyeSymbol, 0, 0)
    ctx.restore()
    ctx.save()
    ctx.textAlign = "left"
    ctx.font = "108px sans-serif"
    ctx.translate(rightEyeX, rightEyeY)
    ctx.rotate(0.2+rightEyeA)
    ctx.fillText(eyeSymbol, 0, 0)
    ctx.restore()
}

function download(name, dataString) {
    const link = document.createElement('a')
    link.download = name
    link.href = dataString
    link.click()
}

const historyList =
    [ "800080002c0asffe6d5", "000400000d0asffe6d5", "000004010c0asffe6d5", "b00010040010sffe6d5"
    , "00000210040asffe6d5", "800000000200sffe6d5", "000001000d0asffe6d5", "008020000c0asffe6d5"
    , "000120001c0asffe6d5", "000001100c0asffe6d5", "002000200c0asffe6d5", "002000080c0asffe6d5"
    , "002080000c0asffe6d5", "000029000c0asffe6d5", "000002000102sffe6d5", "008000800208sffe6d5"
    , "001040000c0asffe6d5", "800000040c0as4ea4ec", "000400100c0esffe6d5", "52802000000asffe6d5"
    , "000400026c0asffe6d5", "008000000d0asffe6d5", "004000400c0asffe6d5", "000408000100sffe6d5"
    , "000800800c0asffe6d5", "000008000d0esffe6d5", "000280000c0esffe6d5", "000008000e08sffe6d5"
    , "800020000c0asffe6d5"]
let redoIndex = 0
const historyCanvas = document.querySelector("#CanvasHistory")
const historyCtx = historyCanvas.getContext("2d", {alpha: false})
const historySize = 48
historyCtx.fillStyle = "#393947"
historyCtx.fillRect(0, 0, historyCanvas.width, historyCanvas.height)
const initialHistory = new Image()
initialHistory.src = `${imagesFolder}/initialHistory.png`
initialHistory.addEventListener("load", e => {
    historyCtx.drawImage(initialHistory, 0, 0)
})

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
    if (historyEntry !== historyList[historyList.length - 1]) {
        historyCtx.drawImage(historyCanvas, historySize + HISTORY_GAP, 0)
        historyCtx.drawImage(canvas, 0, 0, historySize, historySize)
        historyList.push(historyEntry)
    }
    redoIndex = historyList.length - 1
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
        const state = historyList[redoIndex]
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
        const state = historyList[redoIndex]
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
    if (index > historyList.length - 1) return;
    redoIndex = historyList.length - 1 - index
    deserializeState(historyList[redoIndex])
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
function shuffleLayers(reset) {
    let indexes = layers.map(l => l.index)
    if (reset === false) indexes = shuffle(indexes)
    layers.forEach((l, i) => {
        l.sortingShift = indexes[i] - l.index
    })
}
function copyRefs(x) {
    return x
}
function accordingToShift(l1, l2) {
    return (l1.index + l1.sortingShift) - (l2.index + l2.sortingShift)
}
function applyOrderOfLayers() {
    layers.map(copyRefs).sort(accordingToShift).forEach(l => {
        layersSelector.append(l.checkbox.parentElement.parentElement)
    })
    layersSelector.append(unicodeSelector.parentElement.parentElement)
    layersSelector.append(colorSelector.parentElement.parentElement)
}

function layerUp() {
    if (lastSelectedLayer < 0) return
    const layer = layers[lastSelectedLayer]
    if (lastSelectedLayer + layer.sortingShift > 0) {
        const otherLayer = layers.map(copyRefs)
          .sort(accordingToShift)[lastSelectedLayer + layer.sortingShift - 1]
        layer.sortingShift -= 1
        otherLayer.sortingShift += 1
        applyOrderOfLayers()
    }
}
function layerDown() {
    if (lastSelectedLayer < 0) return
    const layer = layers[lastSelectedLayer]
    if (lastSelectedLayer + layer.sortingShift < layers.length - 1) {
        const otherLayer = layers.map(copyRefs)
          .sort(accordingToShift)[lastSelectedLayer + layer.sortingShift + 1]
        layer.sortingShift += 1
        otherLayer.sortingShift -= 1
        applyOrderOfLayers()
    }
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
const randButtons =
    [ document.querySelector("#Random-all")
    , document.querySelector("#Random-eyes")
    , document.querySelector("#Random-mouth")
    , document.querySelector("#Random-face")
    , document.querySelector("#Random-accessories")
    ]
window.addEventListener("keydown", e => {
    if (e.target.type == "text") return;
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
                    deserializeState(historyList[redoIndex])
                    break
                }
            } // fall through
        case "KeyY":
            if (e.ctrlKey) {
                redoIndex = Math.min(historyList.length - 1, redoIndex + 1)
                deserializeState(historyList[redoIndex])
            } break
        case "KeyS":
            shuffleLayers(e.shiftKey)
            applyOrderOfLayers()
            render()
            break
        case "ArrowLeft":
            layerUp()
            render()
            break
        case "ArrowRight":
            layerDown()
            render()
            break
    }
})
