const createRow = (container, studentName, samples) => {
  const row = document.createElement("div")
  row.classList.add("row")
  container.appendChild(row)

  const rowlabel = document.createElement("div")
  rowlabel.innerHTML = studentName
  rowlabel.classList.add("rowLabel")
  row.appendChild(rowlabel)

  for (let sample of samples) {
    const { id, label } = sample

    const sampleContainer = document.createElement("div")
    sampleContainer.id = `sample_${id}`
    sampleContainer.classList.add("sampleContainer")

    const sampleLabel = document.createElement("div")
    sampleLabel.innerHTML = label
    sampleContainer.appendChild(sampleLabel)

    const img = document.createElement("img")
    img.src=`${constants.IMG_DIR}/${id}.png`
    img.classList.add("thumb")
    sampleContainer.appendChild(img)
    row.appendChild(sampleContainer)
  }
}