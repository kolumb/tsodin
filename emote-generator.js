"use strict"

const layersSelector = document.querySelector(".layers-selector")
const downloadElem = document.querySelector("#DownloadElem")

const canvas = document.querySelector("#Canvas")
const ctx = canvas.getContext("2d")
const width = 345
const height = 345
canvas.width = width
canvas.height = height

let skinColor = "#ffe6d5"

const imagesFolder = "images"
const icon4Type = {eyes: "👁", mouth: "👄", face: "👃", accessories: "🕶️", special: "🤔"}
const layers =
    [ {label: "Hmmm Hands"           , fileName: "HmmmHands.png"     , enabled: false , type: "special"}
    , {label: "Anger"                , fileName: "Anger-sign.png"    , enabled: false , type: "accessories"}
    , {label: "Blow"                 , fileName: "Blow.png"          , enabled: false , type: "accessories"}
    , {label: "Mustaches"            , fileName: "Mustaches.png"     , enabled: false , type: "face"}
    , {label: "Sunglasses"           , fileName: "CoolGlasses.png"   , enabled: false , type: "accessories"}

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
        layer.enabled = Math.random() < 0.21
        layer.checkbox.checked = layer.enabled
    })
    render()
})
addRandomizeButton("mouth", e => {
    const mouthes = layers.filter(layer => layer.type === "mouth")
    const randIndex = Math.floor(Math.random() * mouthes.length)
    mouthes.forEach((layer, i) => {
        layer.enabled = i === randIndex
        layer.checkbox.checked = layer.enabled
    })
    render()
})
addRandomizeButton("eyes", e => {
    const eyes = layers.filter(layer => layer.type === "eyes")
    const randIndex = Math.floor(Math.random() * eyes.length)
    eyes.forEach((layer, i) => {
        layer.enabled = i === randIndex
        layer.checkbox.checked = layer.enabled
    })
    render()
})
addRandomizeButton("face", e => {
    const face = layers.filter(layer => layer.type === "face")
    const randIndex = Math.floor(Math.random() * face.length)
    face.forEach((layer, i) => {
        layer.enabled = Math.random() < 0.25
        layer.checkbox.checked = layer.enabled
    })
    render()
})
addRandomizeButton("accessories", e => {
    const accessories = layers.filter(layer => layer.type === "accessories")
    const randIndex = Math.floor(Math.random() * accessories.length)
    accessories.forEach((layer, i) => {
        layer.enabled = Math.random() < 0.21
        layer.checkbox.checked = layer.enabled
    })
    render()
})

let loadedImages = 0
layers.forEach(layer => {
    const input = document.createElement("input")
    input.type = "checkbox"
    input.checked = layer.enabled
    input.id = "layer-" + layer.label
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
        }
    })
})
const colorSelector = document.createElement("input")
colorSelector.type = "color"
colorSelector.value = skinColor
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
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i]
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

layersSelector.addEventListener("click", e => {
    setTimeout(() => {
        layers.forEach(layer => {
            layer.enabled = layer.checkbox.checked
        })
        render()
    }, 50)
})
colorSelector.addEventListener("input", render)
downloadElem.addEventListener("click", e => {
    const fileName = layers.filter(l => l.enabled).map(l => l.fileName).map(name => name.slice(0, -4)).join("-") + ".png"
    download(fileName, canvas.toDataURL("image/png")) 
})
