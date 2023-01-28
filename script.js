const APIURL = 'https://api.github.com/users/';

// getUser('rahuldkjain')

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');





 async function getUser(username){
    try {
        const { data } = await axios(APIURL + username);

        // console.log(data);
        createUserCard(data)
        getRepos(username)
    }
    catch(err){
        {
            createErrorCard('No Profile With Given User Name')
        }
    }
    
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))
}

async function getRepos(username){
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');

        // console.log(data);
        Addreposetocard(data)
    }
    catch(err){
        {
            console.log(err)
            createErrorCard('Probleming in fecthing repose')
        }
    }
}


function createUserCard(user){
    const cardHTML = `
    <div class="card">
                <div>
                    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>
                        ${user.bio}
                    </p>
    
                    <ul>
                        <li>${user.followers}<strong>Followers</strong></li>
                        <li>${user.following}<strong>Following</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                    </ul>
    
                    <div id="repos">
                        
                    </div>
                </div>
            </div>
            `
    main.innerHTML = cardHTML 
}

function createErrorCard(msg){
    const cardHTML= `
    <div class = "card"> 
        <h1>${msg}</h1>
    </div>
    `

    main.innerHTML = cardHTML
}


function Addreposetocard(repos){
    const repose = document.getElementById('repos')

    repos
        .slice(0, 4)
        .forEach(repo => {
            const repoelement = document.createElement('a')

            repoelement.classList.add('repo')

            repoelement.href = repo.html_url

            repoelement.target = '_blank'

            repoelement.innerText = repo.name 

            repose.appendChild(repoelement)


        });
}

form.addEventListener('submit' , (e) => {
    e.preventDefault()

    const user = search.value 

    if(user){
        getUser(user)

        search.value = ''
    }
})