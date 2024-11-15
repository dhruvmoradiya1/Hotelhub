piepeline{

    agent any;

    stages{
        stage('code pull from github'){
            steps{
                git url: "https://github.com/dhruvmoradiya1/Hotelhub.git" branch: "dev"
                echo 'Building the project'
            }
        }
        stage('Build & Test'){
            steps{
                echo 'Testing the project'
            }
        }
        stage('Deploy'){
            steps{
                echo 'Deploying the project'
            }
        }
    }
}