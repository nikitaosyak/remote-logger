import DOMFactory from "./DOMFactory";

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
    var hour = a.getHours() < 10 ? `0${a.getHours()}` : a.getHours();
    var min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
    var sec = a.getSeconds() < 10 ? `0${a.getSeconds()}` : a.getSeconds();
    return date + ' ' + month + ' ' + year + '  ' + hour + ':' + min + ':' + sec ;;
}

window.onload = () => {
    console.log('preved medved')

    const selector = new DOMFactory('source-selector')
        .create('select')
        .px_h(20).w(50)
        .append()

    const options = [
        new DOMFactory('source-selector-options')
            .create('option')
            .v("")
            .html('--select log--')
            .append(selector.element)
        ]

    const log = new DOMFactory('log')
        .create('div')
        .w(100).h(100)
        .append()

    let logElements = []

    selector.element.addEventListener('change', _ => {
        console.log(_)
        console.log(`will query ${selector.element.value}`)

        fetch(`http://localhost:6061/session-contents?id=${selector.element.value}`)
            .then(result=>result.json())
            .then(data => {

                logElements.map(el => {
                    el.remove()
                })
                logElements = []

                console.log(data)
                const contents = data.contents.split('\n')

                for (let i = contents.length-1; i >= 0; i--) {
                    if (i % 2 === 0) {
                        logElements.push(new DOMFactory().create('p').html(contents[i]).append(log.element).element)
                    } else {
                        logElements.push(new DOMFactory().create('p').bgcolor('#EFEFEF').html(contents[i]).append(log.element).element)
                    }
                }
            })
    })

    fetch('http://localhost:6061/list-sessions')
        .then(result => result.json())
        .then(data => {
            console.log(data)

            if (data.sessions.length === 0) return;

            options.map(o => {
                if (o.element.value !== '') {
                    o.element.remove()
                }
            })
            options.splice(1)

            data.sessions.map(logEntry => {
                const deviceName = logEntry.name.split('.')[0]
                const session = logEntry.name.split('.')[1]
                options.push(new DOMFactory('source-selector-option')
                    .create('option').v(logEntry.name).html(`${timeConverter(logEntry.time)}    ${deviceName}`).append(selector.element))
            })
        })
}