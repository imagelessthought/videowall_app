let options = {};

function loadOptions() {
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      options = data;
      populateDropdowns();
      loadInitialLayoutInfo();
      updateElementsBasedOnLayout();
    })
    .catch(error => console.error('Error loading options:', error));
}

function populateDropdowns() {
  // Added "launch-wait-class" at the end.
  const fields = ["head", "layoutType", "layout_Customization", "fade", "timer", "timerStyle", "launch", "launch_wait", "launch_wait_slide", "launch-wait-class"];
  fields.forEach(field => {
    const select = document.getElementById(field);
    options[field].forEach((option, index) => {
      const opt = document.createElement("option");
      let displayValue = option;
      if (option === null) {
        displayValue = "null";
      }
      opt.value = option === null ? "null" : option;
      opt.textContent = displayValue;
      select.appendChild(opt);
      if (field === "layoutType" && index === 0) {
        select.value = opt.value; // Set default selection
      }
    });
  });
}

function createDropdown(id, values) {
  let select = `<select id="${id}">`;
  values.forEach(value => {
    let displayValue = value;
    if (value === null) {
      displayValue = "null";
    }
    select += `<option value="${value === null ? "null" : value}">${displayValue}</option>`;
  });
  select += `</select>`;
  return select;
}

function loadLayoutInfo() {
  const selectedLayout = document.getElementById("layoutType").value;
  if (selectedLayout) {
    const layoutFile = `layout_info/${selectedLayout.toLowerCase().replace(/\s+/g, '')}.html`;
    fetch(layoutFile)
      .then(response => response.text())
      .then(data => {
        document.getElementById("layout-info").innerHTML = data;
      })
      .catch(error => console.error('Error loading layout file:', error));
  }
}

function loadInitialLayoutInfo() {
  const layoutSelect = document.getElementById("layoutType");
  if (layoutSelect.options.length > 0) {
    loadLayoutInfo(); // Load the first layout on startup
  }
}

// Creates an element container with the given index.
function createElement(elementIndex) {
  const container = document.createElement("div");
  container.id = `element_${elementIndex}`;
  // Header for the element.
  const header = document.createElement("h3");
  header.textContent = `Element ${elementIndex}`;
  container.appendChild(header);
  // Div to hold items.
  const itemsDiv = document.createElement("div");
  itemsDiv.id = `items_${elementIndex}`;
  container.appendChild(itemsDiv);
  // "Add Item" button for this element.
  const addItemButton = document.createElement("button");
  addItemButton.textContent = "Add Item";
  addItemButton.type = "button";
  addItemButton.addEventListener("click", function() {
    addItem(elementIndex);
  });
  container.appendChild(addItemButton);
  return container;
}

// When the user selects a layoutType, update the number of elements based on the corresponding childGridItems value.
function updateElementsBasedOnLayout() {
  const layoutSelect = document.getElementById("layoutType");
  const selectedLayout = layoutSelect.value;
  // Find the index of the selected layoutType in options.layoutType.
  const layoutIndex = options.layoutType.indexOf(selectedLayout);
  if (layoutIndex !== -1 && options.childGridItems && options.childGridItems.length > layoutIndex) {
    const numElements = options.childGridItems[layoutIndex];
    const elementsContainer = document.getElementById("elements");
    // Clear any existing elements.
    elementsContainer.innerHTML = "";
    // Create the required number of element containers.
    for (let i = 1; i <= numElements; i++) {
      const element = createElement(i);
      elementsContainer.appendChild(element);
    }
  }
}

function addItem(elementIndex) {
  const itemsDiv = document.getElementById(`items_${elementIndex}`);
  const itemIndex = itemsDiv.children.length + 1;
  const container = document.createElement("div");
  container.id = `item_${elementIndex}_${itemIndex}`;
  container.innerHTML = `
    <h4>Item ${itemIndex}</h4>
    <label><span class="label-text">Content Type: </span>${createDropdown(`contentType_${elementIndex}_${itemIndex}`, options.contentType)}</label><br>
    <label><span class="label-text">Content: </span><input type="text" id="content_${elementIndex}_${itemIndex}"></label><br>
    <label><span class="label-text">Item Duration: </span><input type="text" id="item_duration_${elementIndex}_${itemIndex}"></label><br>
    <label><span class="label-text">QR ID: </span>${createDropdown(`qrId_${elementIndex}_${itemIndex}`, options.qrId)}</label><br>
    <label><span class="label-text">QR File: </span>${createDropdown(`qrFile_${elementIndex}_${itemIndex}`, options.qrFile)}</label><br>
    <label><span class="label-text">Alt ID: </span>${createDropdown(`altId_${elementIndex}_${itemIndex}`, options.altId)}</label><br>
    <label><span class="label-text">Alt File: </span>${createDropdown(`altFile_${elementIndex}_${itemIndex}`, options.altFile)}</label><br>
    <label><span class="label-text">Alt BG: </span>${createDropdown(`altBg_${elementIndex}_${itemIndex}`, options.altBg)}</label><br>
    <label><span class="label-text">Title Class: </span>${createDropdown(`titleClass_${elementIndex}_${itemIndex}`, options.titleClass)}</label><br>
    <label><span class="label-text">Slide Title: </span><input type="text" id="slideTitle_${elementIndex}_${itemIndex}"></label><br>
    <label><span class="label-text">Description: </span><input type="text" id="description_${elementIndex}_${itemIndex}"></label><br>
  `;
  itemsDiv.appendChild(container);
}

// Process top-level duration.
function processDuration(value) {
  value = value.trim();
  if (value.endsWith("000")) {
    return Number(value);
  } else {
    return Number(value) * 1000;
  }
}

// Process item_duration: if the raw numeric value is less than 2, multiply it by the global duration; otherwise, if it ends with "000", use it as is, else multiply by 1000.
function processItemDuration(value, globalDuration) {
  value = value.trim();
  let num = Number(value);
  if (num < 2) {
    return num * globalDuration;
  } else {
    if (value.endsWith("000")) {
      return num;
    } else {
      return num * 1000;
    }
  }
}

function generateJSON() {
  const title = document.getElementById("title").value;
  const head = document.getElementById("head").value;
  const selectedLayoutType = document.getElementById("layoutType").value;
  let contentChild = document.getElementById("contentChild").value;
  if (contentChild && !contentChild.endsWith("/")) {
    contentChild += "/";
  }
  const durationInput = document.getElementById("duration").value;
  const duration = processDuration(durationInput);
  const fade = document.getElementById("fade").value;
  const timer = document.getElementById("timer").value;
  const timerStyle = document.getElementById("timerStyle").value;
  const launchDropdownValue = document.getElementById("launch").value;
  let launch = launchDropdownValue;
  if (launchDropdownValue === "time" || launchDropdownValue === "date/time") {
    const launchInputVal = document.getElementById("launch_input").value;
    if (launchInputVal.trim() !== "") {
      launch = launchInputVal.trim();
    }
  }
  const launch_wait = document.getElementById("launch_wait").value;
  const launch_wait_slide = document.getElementById("launch_wait_slide").value;
  const launchWaitClass = document.getElementById("launch-wait-class").value;
  const layout_Customization = document.getElementById("layout_Customization").value;

  let correspondingLayout = "";
  const layoutIndex = options.layoutType.indexOf(selectedLayoutType);
  if (layoutIndex !== -1 && options.layout && options.layout.length > layoutIndex) {
    correspondingLayout = options.layout[layoutIndex];
  }

  const jsonData = {
    title: title,
    head: head,
    layoutType: selectedLayoutType,
    layout: correspondingLayout,
    layout_Customization: layout_Customization,
    contentChild: contentChild,
    duration: duration,
    fade: fade,
    timer: timer,
    timerStyle: timerStyle,
    launch: launch,
    launch_wait: launch_wait,
    launch_wait_slide: launch_wait_slide,
    "launch-wait-class": launchWaitClass
  };

  function pad(num) {
    return String(num).padStart(3, '0');
  }

  const elementsContainer = document.getElementById("elements");
  for (let i = 0; i < elementsContainer.children.length; i++) {
    let elementKey = "element_" + pad(i + 1);
    jsonData[elementKey] = {};
    const itemsDiv = elementsContainer.children[i].querySelector(`#items_${i + 1}`);
    if (itemsDiv) {
      for (let j = 0; j < itemsDiv.children.length; j++) {
        let itemKey = "item_" + pad(j + 1);
        const currentElementIndex = i + 1;
        const currentItemIndex = j + 1;
        const itemDurationInput = document.getElementById(`item_duration_${currentElementIndex}_${currentItemIndex}`).value;
        const item_duration = processItemDuration(itemDurationInput, duration);
        let qrIdVal = document.getElementById(`qrId_${currentElementIndex}_${currentItemIndex}`).value;
        let altIdVal = document.getElementById(`altId_${currentElementIndex}_${currentItemIndex}`).value;
        let qrFileVal = document.getElementById(`qrFile_${currentElementIndex}_${currentItemIndex}`).value;
        if (qrFileVal === "null") {
          qrFileVal = "null.png";
        }
        let altFileVal = document.getElementById(`altFile_${currentElementIndex}_${currentItemIndex}`).value;
        if (altFileVal === "null") {
          altFileVal = "null.png";
        }
        const itemData = {
          contentType: document.getElementById(`contentType_${currentElementIndex}_${currentItemIndex}`).value,
          content: document.getElementById(`content_${currentElementIndex}_${currentItemIndex}`).value,
          item_duration: item_duration,
          qrId: qrIdVal,
          qrFile: qrFileVal,
          altId: altIdVal,
          altFile: altFileVal,
          altBg: document.getElementById(`altBg_${currentElementIndex}_${currentItemIndex}`).value,
          titleClass: document.getElementById(`titleClass_${currentElementIndex}_${currentItemIndex}`).value,
          slideTitle: document.getElementById(`slideTitle_${currentElementIndex}_${currentItemIndex}`).value,
          description: document.getElementById(`description_${currentElementIndex}_${currentItemIndex}`).value
        };
        jsonData[elementKey][itemKey] = itemData;
      }
    }
  }
  document.getElementById("output").textContent = JSON.stringify(jsonData, null, 4);
}

function copyToClipboard() {
  navigator.clipboard.writeText(document.getElementById("output").textContent);
  alert("Copied to clipboard!");
}

function downloadJSON() {
  const blob = new Blob([document.getElementById("output").textContent], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "generated.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.onload = function() {
  loadOptions();
  document.getElementById("layoutType").addEventListener("change", function(){
    loadLayoutInfo();
    updateElementsBasedOnLayout();
  });
  document.getElementById("launch").addEventListener("change", function() {
    const launchValue = this.value;
    const launchInputContainer = document.getElementById("launchInputContainer");
    const launchInput = document.getElementById("launch_input");
    if (launchValue === "time") {
      launchInputContainer.style.display = "block";
      launchInput.placeholder = "04:28:00 PM";
      launchInput.value = "";
    } else if (launchValue === "date/time") {
      launchInputContainer.style.display = "block";
      launchInput.placeholder = "2/13/2025, 2:44:00 PM";
      launchInput.value = "";
    } else {
      launchInputContainer.style.display = "none";
      launchInput.value = "";
    }
  });
  document.getElementById("generateJsonButton").addEventListener("click", function(event) {
    event.preventDefault();
    generateJSON();
  });
};

fetch('instructions.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('instructions').innerHTML = html;
  })
  .catch(error => console.error('Error loading instructions:', error));
