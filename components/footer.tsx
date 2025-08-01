import React from 'react'
import { Button } from './ui/button'

const Footer = () => {
    return (
        <footer className="border-t py-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-2  gap-8 md:grid-cols-4">
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Product</h4>
                        <ul className="space-y-2">
                            <li><Button variant="link" className="px-0">Features</Button></li>
                            <li><Button variant="link" className="px-0">Pricing</Button></li>
                            <li><Button variant="link" className="px-0">Security</Button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2">
                            <li><Button variant="link" className="px-0">About</Button></li>
                            <li><Button variant="link" className="px-0">Blog</Button></li>
                            <li><Button variant="link" className="px-0">Careers</Button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Support</h4>
                        <ul className="space-y-2">
                            <li><Button variant="link" className="px-0">Help Center</Button></li>
                            <li><Button variant="link" className="px-0">Contact Us</Button></li>
                            <li><Button variant="link" className="px-0">Status</Button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2">
                            <li><Button variant="link" className="px-0">Privacy</Button></li>
                            <li><Button variant="link" className="px-0">Terms</Button></li>
                            <li><Button variant="link" className="px-0">Cookie Policy</Button></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} LockerPro. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer