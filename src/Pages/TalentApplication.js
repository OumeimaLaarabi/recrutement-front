import React, { useEffect, useState } from "react";
import { getApplicationsByCandidate } from "../Services/CandidatureService"; // Ensure the service is correctly imported
import { List, Card, Typography, Alert } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useUserContext } from "../Contexts/AuthContext";
import "./TalentApplication.css";
const { Title, Text } = Typography;
const TalentApplication = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const { user } = useUserContext();
  console.log("User  context:", user);
  const candidatId = user?.id; // Use user.id instead of user._id
  useEffect(() => {
    const fetchApplications = async () => {
      if (!candidatId) {
        console.error("Candidate ID is undefined");
        return; // Exit if candidatId is not available
      }
      try {
        const response = await getApplicationsByCandidate(candidatId);
        console.log("Applications fetched:", response);
        setApplications(response);
      } catch (error) {
        console.error("Aucune candidature trouvée:", error);
        setError("No applications found for this offer.");
      }
    };
  
    fetchApplications();
  }, [candidatId]);
  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  if (applications.length === 0) {
    return (
      <Alert
        message="No applications found for this offer."
        type="info"
        showIcon
      />
    );
  }

  
  return (
    <div className="talent-application-container">
      <Title level={2} className="applications-title">
        Applications for Candidate
      </Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={applications}
        renderItem={(application) => (
          <List.Item key={application._id}>
            <Card
              className="applications-card"
              title={<Text strong>{application.offre ? application.offre.title : "No Offer"}</Text>}
              bordered={false}
              
           
            >
              <div className="status-container">
                <span className={`status-icon ${application.statuts === "ACCEPTED" ? "green" : "red"}`}>
                  {application.statuts === "ACCEPTED" ? (
                    <CheckCircleOutlined />
                  ) : (
                    <ExclamationCircleOutlined />
                  )}
                </span>
                <Text>{application.statuts}</Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TalentApplication;