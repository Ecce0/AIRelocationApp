import React from "react"

const Resume = () => {
  return (
    <div>
      <h1>Resume</h1>

      <section>
        <h2>Current Position</h2>
        <p><strong>Title:</strong> Senior Cloud Engineer</p>
        <p><strong>Dates:</strong> Jan 2022 – Present</p>
        <ul>
          <li>Design and implement scalable cloud infrastructure using AWS services.</li>
          <li>Automate deployments and CI/CD pipelines with Terraform and GitHub Actions.</li>
          <li>Collaborate with cross-functional teams to ensure system reliability and performance.</li>
          <li>Develop serverless applications leveraging Lambda, API Gateway, and DynamoDB.</li>
        </ul>
      </section>

      <section>
        <h2>Previous Position</h2>
        <p><strong>Title:</strong> Cloud Engineer</p>
        <p><strong>Dates:</strong> Jun 2018 – Dec 2021</p>
        <ul>
          <li>Supported infrastructure migrations from on-premises environments to AWS.</li>
          <li>Monitored system performance and optimized resource utilization.</li>
          <li>Implemented IAM security best practices and incident response procedures.</li>
          <li>Collaborated with developers to streamline cloud-native application deployments.</li>
        </ul>
      </section>

      <section>
        <h2>Certifications</h2>
        <ul>
          <li>AWS Certified Solutions Architect – Associate</li>
          <li>AWS Certified SysOps Administrator – Associate</li>
          <li>Terraform Associate Certification</li>
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <p><strong>Bachelor of Science in Information Technology</strong></p>
        <p>University of North Carolina at Greensboro</p>
        <p>Graduated: 2017</p>
      </section>
    </div>
  )
}

export default Resume
