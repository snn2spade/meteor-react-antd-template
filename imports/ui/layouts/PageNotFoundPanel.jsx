import React from 'react';
import {Row, Col, Alert} from 'antd';

export default class PageNotFoundPanel extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <Row gutter={16} style={{marginTop: '15px'}}>
                    <Col span={12}>
                        <Alert
                            message="Error"
                            description="404 Page not found."
                            type="error"
                            showIcon
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}