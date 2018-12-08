import React from 'react';
import LinkFilter from './LinkFilter'
import LinksList from './LinksList'

import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'

export default () => {
      return (
        <div>
          <PrivateHeader title="Your Links"/>
          <div className="page-content">
            <LinkFilter />
            <AddLink />
            <LinksList />
          </div>
        </div>
      )
}
