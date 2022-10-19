onmessage = (event) => {
  const message = event.data
  switch (message.type) {
    case 'init':
      init()
      break
  }
}

function init() {
  console.log("init")
}