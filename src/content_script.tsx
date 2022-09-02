
document.body.addEventListener('click', function(event) {
  const e = event.target as HTMLElement;
  if (e.innerText == "Submit") {
    console.log('bastyn');
        setTimeout(() => {
            const successTag = document.getElementsByClassName('success__3Ai7');
            
            if (checkElem(successTag) && successTag[0].className === 'success__3Ai7' && successTag[0].innerHTML.trim() === 'Success') {
                const probStats = document.getElementsByClassName('data__HC-i');
                const problemName = document.getElementsByClassName
                if (!checkElem(probStats)) {
                    return null;
                }

                const time = probStats[0].textContent;
                const timePercentile = probStats[1].textContent;

                const space = probStats[2].textContent;
                const spacePercentile = probStats[3].textContent;
        
                console.log( `Time: ${time} (${timePercentile}), Space: ${space} (${spacePercentile}) - LeetHub`);
                
                chrome.runtime.onMessage.addListener((msg, sender, callback) => {
                  callback({time:time, space:space});
                });
            }
        }, 10000);
    
  }
})

function    checkElem(elem: string | any[] | HTMLCollectionOf<Element>) {
  return elem && elem.length > 0;
};



