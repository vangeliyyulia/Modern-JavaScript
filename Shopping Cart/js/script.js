// variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');

// listeners
loadEventListeners();

function loadEventListeners() {
    // when a new course is added
    courses.addEventListener('click', buyCourse);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart btn
    clearCartBtn.addEventListener('click', clearCart);

    // document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

// functions
function buyCourse(e) {
    e.preventDefault();
    // use delegation to find a course that was added
    if(e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;
        //read the values
        getCourseInfo(course);
    }
}

// reads the HTML information of the selected course
function getCourseInfo(course) {
    // create an object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // insert into the shopping cart
    addIntoCart(courseInfo);
}

// display the selected course into the shopping cart
function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100px>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // add into the shopping cart
    shoppingCartContent.appendChild(row);

    // add courses into Storage
    saveIntoStorage(course);
}

// add the courses into local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into array
    courses.push(course);
    // storage only saves strings, so convert array into string
    localStorage.setItem('courses', JSON.stringify(courses));
};

// get content from the storage
function getCoursesFromStorage() {
    let courses;
    // if something exists in a storage, we get the value, otherwise we create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

function removeCourse(e) {
    let course, courseId;
    // remove course from the DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    // remove course from the local storage
    removeCourseLocalStorage(courseId);
}

// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLS = getCoursesFromStorage();
    // loop throgh the array and find the index to remove 
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    
    // add the resr of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clears the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // clear from the local storage
    clearLocalStorage();
}

// clears the local storage 
function clearLocalStorage() {
    localStorage.clear();
}

// loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();
    // loop through the courses and print into the cart
    coursesLS.forEach(function(course) {
        // create the <td>
        const row = document.createElement('tr');
        //print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100px>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}