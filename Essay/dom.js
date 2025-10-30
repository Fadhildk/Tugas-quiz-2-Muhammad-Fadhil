window.onload = function() {
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const basket = document.getElementById('basket');
  const basketStat = document.getElementById('basketstat');
  const text1 = document.getElementById('text1');
  const body = document.getElementById('bd');
  const chtextBtn = document.getElementById('chtext');
  const bccolBtn = document.getElementById('bccol');
  const heading = document.querySelector('h1');

  let flowerCount = 0;

  function updateBasketText() {
    basketStat.textContent = `The flower basket currently contains ${flowerCount} flowers.`;
  }

  function addFlower(imgSrc) {
    const clone = document.createElement('img');
    clone.src = imgSrc;
    clone.style.width = '120px';
    clone.style.margin = '5px';
    clone.style.cursor = 'pointer';
    clone.onclick = function() {
      basket.removeChild(clone);
      flowerCount--;
      updateBasketText();
    };
    basket.appendChild(clone);
    flowerCount++;
    updateBasketText();
  }

  img1.onclick = () => addFlower(img1.src);
  img2.onclick = () => addFlower(img2.src);
  img3.onclick = () => addFlower(img3.src);

  function showColorPopup(title, callback) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1000;

    const popup = document.createElement('div');
    popup.style.background = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    popup.style.textAlign = 'center';
    popup.style.position = 'relative';
    popup.style.width = '260px';

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '✕';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '8px';
    closeBtn.style.right = '12px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.fontSize = '18px';
    closeBtn.onclick = () => document.body.removeChild(overlay);

    const headingPopup = document.createElement('h3');
    headingPopup.textContent = title;
    headingPopup.style.marginBottom = '15px';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.width = '100px';
    colorInput.style.height = '40px';
    colorInput.style.cursor = 'pointer';
    colorInput.style.marginBottom = '15px';

    const btnContainer = document.createElement('div');
    btnContainer.style.marginTop = '10px';

    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Apply';
    applyBtn.style.backgroundColor = '#4caf50';
    applyBtn.style.color = 'white';
    applyBtn.style.border = 'none';
    applyBtn.style.borderRadius = '5px';
    applyBtn.style.padding = '8px 15px';
    applyBtn.style.cursor = 'pointer';
    applyBtn.style.fontWeight = 'bold';
    applyBtn.style.marginRight = '10px';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.backgroundColor = '#f44336';
    cancelBtn.style.color = 'white';
    cancelBtn.style.border = 'none';
    cancelBtn.style.borderRadius = '5px';
    cancelBtn.style.padding = '8px 15px';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.fontWeight = 'bold';

    applyBtn.onclick = function() {
      callback(colorInput.value);
      document.body.removeChild(overlay);
    };

    cancelBtn.onclick = function() {
      document.body.removeChild(overlay);
    };

    btnContainer.appendChild(applyBtn);
    btnContainer.appendChild(cancelBtn);
    popup.appendChild(closeBtn);
    popup.appendChild(headingPopup);
    popup.appendChild(colorInput);
    popup.appendChild(btnContainer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  chtextBtn.onclick = function() {
    showColorPopup("Choose Text Color", function(selectedColor) {
      const allTextElements = document.querySelectorAll('*');
      allTextElements.forEach(el => {
        if (
          el !== chtextBtn &&
          el !== bccolBtn &&
          el.nodeType === 1 &&
          el.textContent.trim() !== ''
        ) {
          el.style.color = selectedColor;
        }
      });

      heading.style.color = selectedColor;
      basketStat.style.color = selectedColor;
      basket.style.borderColor = 'black';
    });
  };

  bccolBtn.onclick = function() {
    showColorPopup("Choose Background Color", function(selectedColor) {
      body.style.backgroundColor = selectedColor;
      basket.style.borderColor = 'black'; 
    });
  };
};
