import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="bg-gray-900 to-transparent py-5">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <div className="mb-6">
                    <p className="text-gray-200">Copyright &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Footer;