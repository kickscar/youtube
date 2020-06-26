import React, {Component} from 'react';

export default () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        2020 &copy; <a href="https://kickscar.me">kickscar</a>
                    </div>
                    <div className="col-md-6">
                        <div className="text-md-right footer-links d-none d-sm-block">
                            <a href="https://kickscar.me">About Me</a>
                            <a href="https://kickscar.me">Help</a>
                            <a href="https://kickscar.me">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
