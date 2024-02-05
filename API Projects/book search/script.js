let query = document.querySelector('#search-box');
let result = document.querySelector('.result-list');
let select = document.querySelector('#user-choice');
let filter = 'title';

select.addEventListener('change', (e)=> {

    filter = e.target.value;
    console.log(filter);
})


async function getSearchData(){

    let str = query.value;
    // bookCart.innerText  = '';
    result.innerText = '';

    document.querySelector('.lorder').classList.remove('hide');
    document.querySelector('.error').classList.add('hide');

    const link = `https://openlibrary.org/search.json?${filter}=${str.replaceAll(' ','%20')}&language=eng`;
    try {
        let response = await fetch(link);

    if(response.ok){
        let bookList = await response.json();
        let data = await bookList.docs;

        // console.log(book);

        for(let i = 0; i < 5; i++){

        let bookCart = document.createElement('div');
        bookCart.classList.add('book-card')


        let img = document.createElement('img');
        img.id = 'book-img';
        img.src = filter == 'author' ? `https://covers.openlibrary.org/b/isbn/${data[i].isbn[0]}-M.jpg` : `https://covers.openlibrary.org/b/id/${data[i].cover_i}-M.jpg`;
        
       bookCart.appendChild(img);

        let bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        let p1 = document.createElement('p');
        p1.innerText = "Title : ";
        let title = document.createElement('span');
        title.innerHTML = data[i].title;
        p1.append(title);

        let p2 = document.createElement('p');
        p2.innerText = "Author : ";
        let author = document.createElement('span');
        author.innerHTML = data[i].author_name;
        p2.append(author);

        let p3 = document.createElement('p');
        p3.innerText = "Publish Year : ";
        let publish_year = document.createElement('span');
        publish_year.innerHTML = data[i].first_publish_year;
        p3.append(publish_year);

        let p4 = document.createElement('p');
        p4.innerText = "Pages : ";
        let pages = document.createElement('span');
        pages.innerHTML = data[i].number_of_pages_median ? data[i].number_of_pages_median : '-';
        p4.append(pages);

        bookInfo.append(p1);
        bookInfo.append(p2);
        bookInfo.append(p3);
        bookInfo.append(p4);

        bookCart.append(bookInfo);

        document.querySelector('.result-list').append(bookCart);
        }


    }


    } catch (error) {
        console.log(error);

    // document.querySelector('.lorder').classList.toggle('hide');
    // document.querySelector('.error').classList.toggle('hide');


    }finally{
    document.querySelector('.lorder').classList.toggle('hide');

    }
    
}

// getSearchData();


document.querySelector('#btn-search').addEventListener('click', ()=> getSearchData());