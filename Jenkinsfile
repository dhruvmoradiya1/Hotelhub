pipeline {

    agent any

    stages{
        stage('code pull from github'){
            steps{
                git url: "https://github.com/dhruvmoradiya1/Hotelhub.git", branch: "dev"
            }
        }
        stage('Build Frontend'){
            steps{
                sh "docker build -t mern-frontend ./frontend"
            }
        }
        stage('Build Backend'){
            steps{
                sh "docker build -t mern-backend ./backend"
            }
        }

       /* stage("push images on dockerhub"){
            steps{
                 withCredentials([usernamePassword(
                    credentialsId:"dockerHubCreds",
                    usernameVariable:"dockerHubUser", 
                    passwordVariable:"dockerHubPass")]){
                sh 'echo $dockerHubPass | docker login -u $dockerHubUser --password-stdin'
                sh "docker image tag node-app:latest ${env.dockerHubUser}/node-app:latest"
                sh "docker push ${env.dockerHubUser}/node-app:latest"
                }
            }
        }*/
        stage('Deploy'){
            steps{
                sh "docker compose down && docker compose up -d --build"
            }
        }
    }
}