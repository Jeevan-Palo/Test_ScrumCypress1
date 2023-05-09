pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-p 3000:3000'
        }
      docker {
            image 'cypress/factory:1.0.0'
        }
      docker {
            image 'cypress/base:16.13.0'
        }
      docker {
            image 'cypress/browsers:chrome69'
        }
      docker {
            image 'cypress/included:9.4.1'
        }
    }
    environment {
        CHROME_BIN = '/bin/google-chrome'
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm run build'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'npm i -g browserslist caniuse-lite --save'
                sh 'npm run jira:electron'
                sh 'npx run test'
            }
        }
        stage('e2e Tests') {
            steps {
                sh 'npm run e2e'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }

    post {
        always {
            junit 'results/cypress-report.xml'
        }
    }
}
