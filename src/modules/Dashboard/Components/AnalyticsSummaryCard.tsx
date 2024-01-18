import React from "react";
import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';

interface AnalyticSummaryCardProps {
  title: string;
  tagContent?: string | number | undefined;
  tagColor: string;
  prefix: string;
  isLoading?: boolean;
}

const AnalyticSummaryCard: React.FC<AnalyticSummaryCardProps> = ({
  title,
  tagContent,
  tagColor,
  prefix, 
  isLoading = false,
}) => {
  return (
    <div className="summary-card ">
      <h3 className="summary-title">{title}</h3>
      <Divider />
      <div className="summary-content">
        <Row gutter={[0, 0]} justify="space-between" wrap={false}>
          <Col className="left-content">{prefix}</Col>
          <Divider type="vertical" />
          <Col className="right-content">
            {isLoading ? (
              <Spin />
            ) : (
              <Tooltip title={tagContent ? tagContent.toString() : ''}>
                <Tag className="tag-content" color={tagColor}>
                  {tagContent !== undefined ? tagContent : '0'}
                </Tag>
              </Tooltip>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AnalyticSummaryCard;
