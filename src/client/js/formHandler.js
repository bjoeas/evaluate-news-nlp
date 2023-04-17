function handleSubmit(event) {
    // event.preventDefault()
    //
    // // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // // checkForName(formText)
    //
    // // TODO: Add the Client to the below JS function
    // Client.checkForName(formText)
    //
    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })

    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    console.log(formText);
    postData('/meaningCloud', {url: formText});
    // postData('/meaningCloud', formText);
    // postData('/meaningCloud', 'https://www.seo-analyse.com/seo-lexikon/b/blogpost/');

    // TODO: URL Checker

    // TODO: Update UI
}

const postData = async (url = '', data = {}) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        const newData = await res.json();
        console.log('postData');
        console.log(newData);
        return newData;
    } catch (error) {
        console.error(error);
    }
}

export {handleSubmit}
