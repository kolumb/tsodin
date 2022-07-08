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

const layers =
    [ {label: "Hmmm Hands"           , fileName: "HmmmHands.png"     , enabled: false}
    , {label: "Anger"                , fileName: "Anger-sign.png"    , enabled: false}
    , {label: "Blow"                 , fileName: "Blow.png"          , enabled: false}
    , {label: "Mustaches"            , fileName: "Mustaches.png"     , enabled: false}
    , {label: "🕶️ Sunglasses"           , fileName: "CoolGlasses.png"   , enabled: false}

    , {label: "👁 Eyes"                 , fileName: "WEyes.png"         , enabled: true}
    , {label: "👁 Absent eyes"          , fileName: "AbsentEyes.png"    , enabled: false}
    , {label: "👁 Awoo eyes"            , fileName: "AwooEyes.png"      , enabled: false}
    , {label: "👁 Big eyes"             , fileName: "BigEyes.png"       , enabled: false}
    , {label: "👁 Crying eyes"          , fileName: "CryEyes.png"       , enabled: false}
    , {label: "👁 Cute eyes"            , fileName: "CuteEyes.png"      , enabled: false}
    , {label: "👁 Eyes looking to left" , fileName: "ToLeftEyes.png"    , enabled: false}
    , {label: "👁 Shocked eyes"         , fileName: "Shocked.png"       , enabled: false}
    , {label: "👁 Sleeping eyes"        , fileName: "SlipEyes.png"      , enabled: false}
    , {label: "👁 Smug eyes"            , fileName: "InsidiousEyes.png" , enabled: false}
    , {label: "👁 Sus eyes"             , fileName: "SusEyes.png"       , enabled: false}
    , {label: "👁 Stare eyes"           , fileName: "StareEyes.png"     , enabled: false}
    , {label: "👁 Weeb eyes"            , fileName: "HappyEyes.png"     , enabled: false}

    , {label: "👄 Mouth"                , fileName: "WMouth.png"        , enabled: true}
    , {label: "👄 Ahegao mouth"         , fileName: "Ahegao.png"        , enabled: false}
    , {label: "👄 Awoo mouth"           , fileName: "AwooMouth.png"     , enabled: false}
    , {label: "👄 Dissapointed mouth"   , fileName: "Dissapointed.png"  , enabled: false}
    , {label: "👄 Evil mouth"           , fileName: "EvilMouth.png"     , enabled: false}
    , {label: "👄 PauseChamp mouth"     , fileName: "Pause.png"         , enabled: false}
    , {label: "👄 Pocker mouth"         , fileName: "PockerMouth.png"   , enabled: false}
    , {label: "👄 Pog mouth"            , fileName: "Pog.png"           , enabled: false}
    , {label: "👄 Screaming mouth"      , fileName: "DMouth.png"        , enabled: false}
    , {label: "👄 Sad mouth"            , fileName: "SadMouth.png"      , enabled: false}
    , {label: "👄 Smug mouth"           , fileName: "SmugMouth.png"     , enabled: false}
    , {label: "👄 Weeb mouth"           , fileName: "HappyMouth.png"    , enabled: false}

    , {label: "Glasses frame"        , fileName: "GlassesFrame.png"  , enabled: true}
    , {label: "Glass"                , fileName: "Glass.png"         , enabled: true}
    , {label: "Sweat"                , fileName: "Sweat.png"         , enabled: false}
    , {label: "Angry eyebrows"       , fileName: "AngryEyebrows.png" , enabled: false}
    , {label: "Smily cheeks"         , fileName: "SmilyCheeks.png"   , enabled: false}
    , {label: "👃 Nose"                 , fileName: "Nose.png"          , enabled: true}
    , {label: "Blush on cheeks"      , fileName: "Blush.png"         , enabled: false}
    , {label: "Blush for ahegao"     , fileName: "GrayBlush.png"     , enabled: false}
    , {label: "Background"           , fileName: "HeadPhones.png"    , enabled: true}
    , {label: "Shadow"               , fileName: "Shadow.png"        , enabled: false}
    ]

{
    const randButton = document.createElement("button")
    randButton.appendChild(document.createTextNode("Randomize"))
    randButton.addEventListener("click", e => {
        layers.forEach(layer => {
            layer.enabled = Math.random() < 0.21
            layer.checkbox.checked = layer.enabled
        })
        render()
    })

    const li = document.createElement("li")
    li.appendChild(randButton)
    layersSelector.appendChild(li)
}

let loadedImages = 0
layers.forEach(layer => {
    const input = document.createElement("input")
    input.type = "checkbox"
    input.checked = layer.enabled
    input.id = "layer-" + layer.label
    layer.checkbox = input

    const label = document.createElement("label")
    label.appendChild(input)
    label.appendChild(document.createTextNode(layer.label))

    const li = document.createElement("li")
    li.appendChild(label)
    layersSelector.appendChild(li)

    layer.image = new Image()
    layer.image.src = layer.fileName
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
