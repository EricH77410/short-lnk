import React from 'react';
import LinkFilter from './LinkFilter'
import LinksList from './LinksList'

import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'

export default () => {
      return (
        <div>
          <PrivateHeader title="Your Short Lnks"/>

          <div className="page-content">

            <div className="page-header">
              <LinkFilter />
              <AddLink />
            </div>

            <LinksList />
          </div>
        </div>
      )
}
